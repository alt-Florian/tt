import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { CustomerConfigFormViewModel } from "@pages/Config/CustomerConfig/CustomerConfigForm.viewmodel";

export default function CustomerConfigForm() {
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
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  } = CustomerConfigFormViewModel();

  if (isPending) return <SmallSpinner />;
  if (isError)
    return <p>Une erreur s'est produite lors du chargement des données</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div className="space-y-12">
        <div className="bg-gray-100 border-b border-gray-200 text-gray-900/50 p-4">
          {isUpdate
            ? "Modifier le type de client"
            : "Ajouter un nouveau type de client"}
        </div>
        <div className="pb-12 p-4">
          <div className="mt-10 flex flex-col gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nom *
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
                  Un type de client avec ce nom existe déjà
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="colorCode"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Code couleur *
              </label>
              <div className="relative mt-2 rounded-md">
                <input
                  id="colorCode"
                  name="colorCode"
                  type="color"
                  aria-invalid="true"
                  aria-describedby="colorCode-error"
                  className="cursor-pointer block w-20 h-8 rounded-md shadow-sm border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  onChange={handleChange}
                  value={values.colorCode}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.colorCode && errors.colorCode ? (
                    <p id="colorCode-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.colorCode && errors.colorCode ? (
                <p id="colorCode-error" className="mt-2 text-sm text-red-600">
                  {errors.colorCode}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
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
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md shadow-sm border-gray-300 hover:bg-gray-100"
            onClick={openConfirmDeleteModal}
          >
            Supprimer le type de client
          </button>
        ) : null}
      </div>
    </form>
  );
}
