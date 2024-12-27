import { create } from "zustand";
import { MissionBlockInterface } from "@interfaces/mission/Mission.interface";

/**
 * Convertit un nombre de millisecondes en "HH:MM:SS".
 */
function msToHHMMSS(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
}

interface CurrentTask {
  taskId: string;
  blockId: string;
  title: string;
  description: string;
  companyName: string;
  timeMs: number;   
  time: string;     
  isPaused: boolean; 
}


interface MissionStore {
  blocks: MissionBlockInterface[];
  globalProgress: number;
  currentTask: CurrentTask | null;
  showResumeCard: boolean;
  intervalId: NodeJS.Timeout | null;

  // Méthodes de base
  initializeBlocks: (blocks: MissionBlockInterface[]) => void;
  calculateGlobalProgress: () => void;
  updateResumeCardVisibility: () => void;
  resumeLastTask: () => void;
  closeResumeCard: () => void;
  toggleTask: (blockId: string, taskId: string) => void;

  // Méthodes liées au timer
  startTaskTimer: (blockId: string, taskId: string) => void;
  togglePauseTimer: () => void;   // Un seul bouton => Play/Pause
  stopTaskTimer: () => void;
}

export const useMissionStore = create<MissionStore>((set, get) => ({
  blocks: [],
  globalProgress: 0,
  currentTask: null,
  showResumeCard: false,
  intervalId: null,

  /**
   * 1) Initialise les blocs :
   *    - Calcule la progression de chaque bloc (b_progress)
   *    - Calcule la progression globale
   *    - Vérifie si on doit afficher la CardResumeTask
   */
  initializeBlocks: (blocks) => {
    const updatedBlocks = blocks.map((block) => {
      const totalTasks = block.tasks.length;
      const doneTasks = block.tasks.filter((t) => t.done).length;
      const b_progress =
        totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

      return { ...block, b_progress };
    });

    set({ blocks: updatedBlocks });

    get().calculateGlobalProgress();
    get().updateResumeCardVisibility();
  },

  /**
   * 2) Calcule la progression globale (0-100) 
   *    en se basant sur toutes les tâches de tous les blocs.
   */
  calculateGlobalProgress: () => {
    const { blocks } = get();
    const totalTasks = blocks.reduce((sum, block) => sum + block.tasks.length, 0);
    const doneTasks = blocks.reduce(
      (sum, block) => sum + block.tasks.filter((t) => t.done).length,
      0
    );

    const globalProgress =
      totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

    set({ globalProgress });
  },

  /**
   * 3) Vérifie s'il existe une tâche non terminée
   *    qui a un "taskTimer" et `totalTimer > 0`
   *    pour afficher la CardResumeTask
   */
  updateResumeCardVisibility: () => {
    const { blocks } = get();

    const hasTaskToResume = blocks.some((block) =>
      block.tasks.some((task) => !task.done && task.taskTimer && task.taskTimer.totalTimer > 0)
    );

    set({ showResumeCard: hasTaskToResume });
  },

  /**
   * 4) Reprend la première tâche "en pause" qu'on trouve
   *    => currentTask = { ...timeMs = valeur de taskTimer.totalTimer }
   *    => Relance un interval pour incrémenter le timer
   */
  resumeLastTask: () => {
    const { blocks, intervalId } = get();

    // Clear l'interval actif, s'il y en a un (au cas où)
    if (intervalId) {
      clearInterval(intervalId);
    }

    // On cherche la première tâche "en pause" avec taskTimer.totalTimer > 0
    for (const block of blocks) {
      for (const task of block.tasks) {
        if (!task.done && task.taskTimer && task.taskTimer.totalTimer > 0) {
          const ms = task.taskTimer.totalTimer;

          // On set la tâche courante
          set({
            currentTask: {
              taskId: task._id,
              blockId: block._id,
              title: task.name || "Tâche reprise",
              description: "Tâche à reprendre",
              companyName: "Exemple",
              timeMs: ms,
              time: msToHHMMSS(ms),
              isPaused: false,
            },
            showResumeCard: false,
          });

          // On recrée l'interval pour incrémenter le temps
          const newInterval = setInterval(() => {
            set((state) => {
              if (!state.currentTask) return {};
              if (state.currentTask.isPaused) return {};

              const newTimeMs = state.currentTask.timeMs + 1000;
              return {
                currentTask: {
                  ...state.currentTask,
                  timeMs: newTimeMs,
                  time: msToHHMMSS(newTimeMs),
                },
              };
            });
          }, 1000);

          set({ intervalId: newInterval });

          // @DEV FAIRE L'APPEL HTTP ICI POUR DIRE "On a repris la tâche"

          return;
        }
      }
    }
  },

  /**
   * 5) Cache la carte de reprise
   */
  closeResumeCard: () => {
    set({ showResumeCard: false });
  },

  /**
   * 6) Coche/décoche une tâche, recalcule la progression,
   *    puis si c'était la currentTask => on l'arrête
   */
  toggleTask: (blockId, taskId) => {
    const { currentTask, intervalId } = get();

    set((state) => {
      const updatedBlocks = state.blocks.map((block) => {
        if (block._id === blockId) {
          const updatedTasks = block.tasks.map((task) => {
            if (task._id === taskId) {
              // On inverse "done"
              return { ...task, done: !task.done };
            }
            return task;
          });

          // Recalcule la progression locale du bloc
          const totalTasks = updatedTasks.length;
          const doneTasks = updatedTasks.filter((t) => t.done).length;
          const b_progress =
            totalTasks === 0
              ? 0
              : Math.round((doneTasks / totalTasks) * 100);

          return { ...block, tasks: updatedTasks, b_progress };
        }
        return block;
      });

      return { blocks: updatedBlocks };
    });

    // Mise à jour progression globale + cardResume
    get().calculateGlobalProgress();
    get().updateResumeCardVisibility();

    // Si la tâche qu'on vient de cocher était la currentTask => on arrête
    if (currentTask && currentTask.taskId === taskId) {
      // On retrouve la nouvelle version de la tâche
      const reFetchedBlock = get().blocks.find((b) => b._id === blockId);
      const reFetchedTask = reFetchedBlock?.tasks.find((t) => t._id === taskId);

      if (reFetchedTask?.done) {
        // Arrêter le timer
        if (intervalId) clearInterval(intervalId);

        // Libérer currentTask
        set({ currentTask: null, intervalId: null });

        // @DEV FAIRE L'APPEL HTTP ICI POUR DIRE "Tâche terminée"
      }
    }
  },

  // --------------------- GESTION DU TIMER ---------------------

  /**
   * startTaskTimer : lance la tâche (blockId, taskId)
   * 1) Arrête l'interval précédent (si un)
   * 2) Récupère la valeur existante (taskTimer.totalTimer) pour init
   * 3) Incrémente toutes les secondes => currentTask.timeMs
   */
  startTaskTimer: (blockId, taskId) => {
    const { intervalId, blocks } = get();

    // 1) Si un interval existe, on l'arrête
    if (intervalId) clearInterval(intervalId);

    // 2) Cherche la tâche dans "blocks"
    const block = blocks.find((b) => b._id === blockId);
    const task = block?.tasks.find((t) => t._id === taskId);
    if (!block || !task) return;

    // Récupère la valeur en ms depuis "taskTimer.totalTimer" si présent et >0, sinon 0
    const previousMs = task.taskTimer && task.taskTimer.totalTimer > 0 ? task.taskTimer.totalTimer : 0;

    // 3) On initialise la currentTask
    set({
      currentTask: {
        taskId: taskId,
        blockId: blockId,
        title: task.name || "Nouvelle Tâche",
        description: "En cours",
        companyName: "Ma Société",
        timeMs: previousMs,
        time: msToHHMMSS(previousMs),
        isPaused: false,
      },
    });

    // On crée l'interval qui incrémente le timer d'1s en 1s
    const newInterval = setInterval(() => {
      set((state) => {
        if (!state.currentTask) return {};
        if (state.currentTask.isPaused) return {};

        const newTimeMs = state.currentTask.timeMs + 1000;
        return {
          currentTask: {
            ...state.currentTask,
            timeMs: newTimeMs,
            time: msToHHMMSS(newTimeMs),
            isPaused: false,
          },
        };
      });
    }, 1000);

    set({ intervalId: newInterval });

    // @DEV FAIRE L'APPEL HTTP ICI POUR DIRE "Lancement (Play) d'une nouvelle tâche"
  },

  /**
   * togglePauseTimer :
   *  - Passe de "en cours" à "pause", ou "pause" à "en cours"
   *  - Arrête ou relance l'interval
   */
  togglePauseTimer: () => {
    const { currentTask, intervalId } = get();
    if (!currentTask) return;

    if (!currentTask.isPaused) {
      // => On met en pause
      if (intervalId) clearInterval(intervalId);

      // @DEV FAIRE L'APPEL HTTP ICI POUR "Pause"

      set({
        currentTask: { ...currentTask, isPaused: true },
        intervalId: null,
      });
    } else {
      // => On relance
      const newInterval = setInterval(() => {
        set((state) => {
          if (!state.currentTask) return {};
          if (state.currentTask.isPaused) return {};

          const newTimeMs = state.currentTask.timeMs + 1000;
          return {
            currentTask: {
              ...state.currentTask,
              timeMs: newTimeMs,
              time: msToHHMMSS(newTimeMs),
            },
          };
        });
      }, 1000);

      set({
        currentTask: { ...currentTask, isPaused: false },
        intervalId: newInterval,
      });

      // @DEV FAIRE L'APPEL HTTP ICI POUR "Reprise (resume)"
    }
  },

  /**
   * stopTaskTimer :
   *  - Arrête l'interval
   *  - Met currentTask = null
   *  - Optionnel : met à jour taskTimer.totalTimer avec timeMs ou le met à null si timeMs === 0
   */
  stopTaskTimer: () => {
    const { intervalId, currentTask, blocks } = get();

    if (intervalId) clearInterval(intervalId);

    // Sauvegarder la valeur finale dans la tâche
    if (currentTask) {
      const updatedBlocks = blocks.map((block) => {
        if (block._id === currentTask.blockId) {
          const updatedTasks = block.tasks.map((task) => {
            if (task._id === currentTask.taskId) {
              if (currentTask.timeMs === 0) {
                // Si timeMs est 0, on met taskTimer à null
                return {
                  ...task,
                  taskTimer: null,
                };
              } else {
                // Sinon, on met à jour taskTimer.totalTimer
                if (task.taskTimer) {
                  return {
                    ...task,
                    taskTimer: {
                      ...task.taskTimer,
                      totalTimer: currentTask.timeMs,
                    },
                  };
                } else {
                  // S'il n'y avait pas de taskTimer, on en crée un
                  return {
                    ...task,
                    taskTimer: {
                      _id: "generated-id", // Remplacer par un ID approprié si nécessaire
                      totalTimer: currentTask.timeMs,
                    },
                  };
                }
              }
            }
            return task;
          });
          return { ...block, tasks: updatedTasks };
        }
        return block;
      });

      set({ blocks: updatedBlocks });
    }

    set({
      currentTask: null,
      intervalId: null,
    });

    // @DEV FAIRE L'APPEL HTTP ICI POUR DIRE "Stop"
  },
}));
