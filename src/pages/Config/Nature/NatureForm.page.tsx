import MultiSelectV2 from "@components/ui/MultiSelectV2";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { NatureFormViewModel } from "@pages/Config/Nature/NatureForm.viewmodel";

export default function NatureForm() {
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
    letterTemplates,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  } = NatureFormViewModel();

  if (isPending) return <SmallSpinner />;
  if (isError)
    return <p>Une erreur s'est produite lors du chargement des données</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div>
        <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          {isUpdate
            ? "Modifier la nature de lettre de mission"
            : "Ajouter une nouvelle nature de lettre de mission"}
        </div>
        <div className="flex flex-col lg:flex-row mt-6 lg:mt-10 gap-4 lg:gap-8 pb-4 lg:pb-12 px-4">
          <div className="h-full flex-1 flex flex-col justify-between gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nom de la nature de lettre *
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="name-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
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
              {isErrorOnMutation &&
              errorOnMutation.status === 409 &&
              errorOnMutation?.response.data.context?.error?.field ===
                "name" ? (
                <p className="mt-2 text-sm text-red-600">
                  Une nature avec ce nom existe déjà
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="alertDelay"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Délai d'alerte (en jours)
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="alertDelay"
                  name="alertDelay"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="alertDelay-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onChange={handleChange}
                  value={values.alertDelay}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.alertDelay && errors.alertDelay ? (
                    <p id="alertDelay-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.alertDelay && errors.alertDelay ? (
                <p id="alertDelay-error" className="mt-2 text-sm text-red-600">
                  {errors.alertDelay}
                </p>
              ) : null}
            </div>
            <div>
              <div className="relative rounded-md shadow-sm">
                <MultiSelectV2
                  list={letterTemplates}
                  label="Modèles de lettres de mission associés *"
                  values={values.templates}
                  onChange={(selectedValues) =>
                    setFieldValue("templates", selectedValues)
                  }
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.templates && errors.templates ? (
                    <p
                      id="templates-error"
                      className="mt-8 mr-4 text-sm text-red-600"
                    >
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.templates && errors.templates ? (
                <p id="templates-error" className="mt-2 text-sm text-red-600">
                  {errors.templates}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description
            </label>
            <div className="relative flex-1 mt-2 rounded-md shadow-sm">
              <textarea
                id="description"
                name="description"
                aria-invalid="true"
                aria-describedby="description-error"
                className="block w-full h-40 lg:h-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 resize-none"
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
      </div>
      <p className="text-xs p-4">* Champs obligatoires</p>
      <div className="flex items-center justify-between gap-x-6 p-4">
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
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md shadow-sm border-gray-300 hover:bg-gray-100"
            onClick={openConfirmDeleteModal}
          >
            Supprimer le modèle
          </button>
        ) : null}
      </div>
    </form>
  );
}
