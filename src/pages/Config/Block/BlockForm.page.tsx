import MultiSelectV2 from "@components/ui/MultiSelectV2";
import SelectWithSearch from "@components/ui/SelectWithSearch";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import SortableTask from "@pages/Config/Block/SortableTask";
import { BlockFormViewModel } from "./BlockForm.viewmodel";

export default function BlockForm() {
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    touched,
    values,
    isUpdate,
    id,
    openConfirmDeleteModal,
    navigate,
    listPathWithSkip,
    natures,
    prices,
    tasksList,
    isPending,
    isError,
    selectedTaskToAdd,
    setselectedTaskToAdd,
    sortableTasks,
    setSortableTasks,
    handleDragEnd,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  } = BlockFormViewModel();

  if (isPending) return <SmallSpinner />;
  if (isError)
    return <p>Une erreur s'est produite lors du chargement des données</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4  bg-white rounded-md border border-gray-200"
    >
      <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
        {isUpdate ? "Modifier le bloc" : "Ajouter un nouveau bloc"}
      </div>
      <div className="flex flex-col xl:flex-row gap-6 px-4 py-6">
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Nom du bloc *
            </label>
            <div className="relative mt-2 shadow-sm">
              <input
                id="name"
                name="name"
                aria-invalid="true"
                aria-describedby="name-error"
                type="text"
                className="resize-none overflow-hidden w-full border border-gray-300 rounded-md text-sm text-gray-900 px-3 py-1 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.name}
              ></input>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.name && errors.name ? (
                  <p id="name-error" className="text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.name && errors.name ? (
              <p id="name-error" className="mt-2 text-sm text-red-600">
                {errors.name}
              </p>
            ) : null}
            {isErrorOnMutation &&
            errorOnMutation.status === 409 &&
            errorOnMutation?.response.data.context?.error?.field === "name" ? (
              <p className="mt-2 text-sm text-red-600">
                Un bloc avec ce nom existe déjà
              </p>
            ) : null}
          </div>
          <div>
            <div className="relative rounded-md shadow-sm">
              <MultiSelectV2
                list={natures}
                label="Natures associées *"
                values={values.natures}
                onChange={(selectedValues) =>
                  setFieldValue("natures", selectedValues)
                }
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.natures && errors.natures ? (
                  <p
                    id="natures-error"
                    className="mr-4 mt-8 text-sm text-red-600"
                  >
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.natures && errors.natures ? (
              <p id="natures-error" className="mt-2 text-sm text-red-600">
                {errors.natures}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description *
            </label>
            <div className="relative flex-1 mt-2 rounded-md shadow-sm">
              <textarea
                id="description"
                name="description"
                aria-invalid="true"
                aria-describedby="description-error"
                className="block w-full min-h-60 rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 resize-none"
                onChange={handleChange}
                value={values.description}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.description && errors.description ? (
                  <p id="description-error" className="text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.description && errors.description ? (
              <p id="description-error" className="mt-2 text-sm text-red-600">
                {errors.description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="relative rounded-md shadow-sm">
            <MultiSelectV2
              list={prices}
              label="Tarifs associées *"
              values={values.prices}
              onChange={(selectedValues) =>
                setFieldValue("prices", selectedValues)
              }
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {touched.prices && errors.prices ? (
                <p id="prices-error" className="mr-4 text-sm text-red-600">
                  <ExclamationCircleIcon
                    aria-hidden="true"
                    className="size-5 text-red-500"
                  />
                </p>
              ) : null}
            </div>
            {touched.prices && errors.prices ? (
              <p id="prices-error" className="mt-2 text-sm text-red-600">
                {errors.prices}
              </p>
            ) : null}
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-black whitespace-nowrap ">
                Tâches associées
              </p>
              <div className="flex items-center justify-between space-x-4 mb-4">
                <SelectWithSearch
                  list={tasksList}
                  value={selectedTaskToAdd}
                  onChange={(value) => {
                    if (value) setselectedTaskToAdd(value.toString());
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSortableTasks((prevTasks) => {
                      //create an id that doesnt already exists
                      const maxId =
                        prevTasks.length > 0
                          ? Math.max(...prevTasks.map((task) => task.id))
                          : -1;
                      const newId = maxId + 1;
                      //add new Task to sortableTasks
                      return [
                        ...prevTasks,
                        {
                          id: newId,
                          text: selectedTaskToAdd,
                        },
                      ];
                    });
                  }}
                  className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-100"
                >
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  <span>Ajouter</span>
                </button>
              </div>
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext
                  items={sortableTasks}
                  strategy={verticalListSortingStrategy}
                >
                  {sortableTasks.map((task) => {
                    return (
                      <SortableTask
                        key={task.id}
                        id={task.id}
                        text={
                          tasksList.find((t) => t.id === task.text)?.name || ""
                        }
                        handleRemoveTask={() => {
                          setSortableTasks((prevTasks) =>
                            prevTasks.filter((t) => t.id !== task.id)
                          );
                        }}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.tasks && errors.tasks ? (
                  <p id="tasks-error" className="mt-2 text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.tasks && errors.tasks ? (
              <p id="tasks-error" className="mt-2 text-sm text-red-600">
                {errors.tasks}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <p className="text-xs px-4">* Champs obligatoires</p>
      <div className="flex items-center justify-between gap-x-6 p-4">
        <div className="flex">
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-100 mr-4"
            onClick={() => navigate(listPathWithSkip)}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isPendingOnMutation}
            className="flex items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold border rounded-md border-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isPendingOnMutation && <ButtonSpinner className="size-4" />}
            <span>
              {isUpdate ? "Enregistrer les modifications" : "Enregistrer"}
            </span>
          </button>
        </div>
        {id ? (
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-100"
            onClick={openConfirmDeleteModal}
          >
            Supprimer le bloc
          </button>
        ) : null}
      </div>
    </form>
  );
}
