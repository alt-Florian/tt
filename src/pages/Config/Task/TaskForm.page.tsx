import Select from "@components/ui/Select";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { TaskFormViewModel } from "@pages/Config/Task/TaskForm.viewmodel";

export default function TaskForm() {
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
    types,
    priorityAffectations,
    isPending,
    isError,
    isPendingOnMutation,
  } = TaskFormViewModel();

  if (isPending) return <SmallSpinner />;
  if (isError)
    return <p>Une erreur s'est produite lors du chargement des données</p>;
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200 pb-4"
    >
      <div className="space-y-6 lg:space-y-10">
        <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          {isUpdate ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
        </div>
        <div className="flex flex-col gap-6 mt-10 pb-12 px-4">
          <div className="flex flex-col justify-between">
            <label
              htmlFor="name"
              className="block text-sm/6 mt-2 font-medium text-gray-900"
            >
              Nom de la tâche *
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                name="name"
                type="text"
                aria-invalid="true"
                aria-describedby="name-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-4 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.name}
              />
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
          </div>
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <Select
                isOptional
                list={types}
                label={"Type de tâches"}
                value={values.type}
                onChange={(e) => setFieldValue("type", e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.type && errors.type ? (
                  <p id="type-error" className="mt-2 text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.type && errors.type ? (
              <p id="type-error" className="mt-2 text-sm text-red-600">
                {errors.type}
              </p>
            ) : null}
          </div>
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <Select
                isOptional
                list={priorityAffectations}
                label={"Affectation prioritaire"}
                value={values.priorityAffectation}
                onChange={(e) =>
                  setFieldValue("priorityAffectation", e.target.value)
                }
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.priorityAffectation && errors.priorityAffectation ? (
                  <p
                    id="priorityAffectation-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.priorityAffectation && errors.priorityAffectation ? (
              <p
                id="priorityAffectation-error"
                className="mt-2 text-sm text-red-600"
              >
                {errors.priorityAffectation}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col justify-between">
            <label
              htmlFor="estimationTime"
              className="block text-sm/6 mt-2 font-medium text-gray-900"
            >
              Temps estimé
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="estimationTime"
                name="estimationTime"
                type="text"
                aria-invalid="true"
                aria-describedby="estimationTime-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-4 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.estimationTime}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.estimationTime && errors.estimationTime ? (
                  <p
                    id="estimationTime-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.estimationTime && errors.estimationTime ? (
              <p
                id="estimationTime-error"
                className="mt-2 text-sm text-red-600"
              >
                {errors.estimationTime}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-6 px-4">
        <div className="flex">
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md shadow-sm border-gray-300 hover:bg-gray-100 mr-4"
            onClick={() => navigate(listPathWithSkip)}
          >
            Annuler
          </button>
          <button
            type="submit"
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
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md shadow-sm border-gray-300 hover:bg-gray-100"
            onClick={openConfirmDeleteModal}
          >
            Supprimer la tâche
          </button>
        ) : null}
      </div>
    </form>
  );
}
