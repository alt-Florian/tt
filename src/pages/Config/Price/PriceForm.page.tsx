import Select from "@components/ui/Select";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { PriceFormViewModel } from "@pages/Config/Price/PriceForm.viewmodel";

export default function PriceForm() {
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    isUpdate,
    id,
    openConfirmDeleteModal,
    navigate,
    listPathWithSkip,
    types,
    setFieldValue,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  } = PriceFormViewModel();

  if (isPending) return <SmallSpinner />;
  if (isError)
    return <p>Une erreur s'est produite lors du chargement des données</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div>
        <div className="bg-gray-100 border-b border-gray-200 text-gray-900/50 p-4">
          {isUpdate ? "Modifier le tarif" : "Ajouter un nouveau tarif"}
        </div>
        <div className="flex flex-col lg:flex-row mt-6 lg:mt-10 gap-4 lg:gap-8 pb-4 lg:pb-12 px-4">
          <div className="h-full flex-1 flex flex-col justify-between gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nom du Tarif *
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="name-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
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
                  Un tarif avec ce nom existe déjà
                </p>
              ) : null}
            </div>
            <div>
              <div className="relative mt-2 mb-3 rounded-md shadow-sm">
                <Select
                  list={types}
                  label={"Type de tarif *"}
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
              <label
                htmlFor="value"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Valeur{" "}
                {values.type === "3" || values.type === "4"
                  ? "en %"
                  : "en euros"}{" "}
                *
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="value"
                  name="value"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="value-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onChange={handleChange}
                  value={values.value}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.value && errors.value ? (
                    <p id="value-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>

              {touched.value && errors.value ? (
                <p id="value-error" className="mt-2 text-sm text-red-600">
                  {errors.value}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
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
            Supprimer le tarif
          </button>
        ) : null}
      </div>
    </form>
  );
}
