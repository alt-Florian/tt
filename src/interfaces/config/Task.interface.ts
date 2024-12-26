export interface Task {
  name: string;
  type?: number | null;
  priorityAffectation?: number | null;
  deadline?: number;
  estimationTime?: string;
}

export interface TaskData extends Task {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface TaskResponse {
  statusCode: number;
  datas: TaskData;
}
export type TaskDisplayedKeys = "name";

export type FilteredTaskData = Partial<Pick<TaskData, TaskDisplayedKeys>> & {
  [key: string]: any;
};
