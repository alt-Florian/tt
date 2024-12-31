import { PatrimonyPhysicalFormViewModel } from "@components/forms/PatrimonyPhysicalForm.viewmodel";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface PatrimonyPhysicalFormPropsInterface {
  handleClose: () => void;
  id: string;
  patrimonyId?: string;
}

export default function PatrimonyPhysicalForm({
  handleClose,
  id,
  patrimonyId,
}: PatrimonyPhysicalFormPropsInterface) {
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    isUpdate,
    openConfirmDeleteModal,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  } = PatrimonyPhysicalFormViewModel(id, handleClose, patrimonyId);

  if (isPending) return <SmallSpinner />;
  if (isError) return <p>Une erreur s'est produite</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div>
        <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          {isUpdate
            ? "Modifier le patrimoine"
            : "Ajouter un nouveau patrimoine"}
        </div>
        <div className="flex flex-col gap-6 p-4">
          <div>
            <label
              htmlFor="year"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Année *
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="year"
                name="year"
                type="text"
                aria-invalid="true"
                aria-describedby="name-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.year}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.year && errors.year ? (
                  <p id="year-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.year && errors.year ? (
              <p id="year-error" className="mt-2 text-sm text-red-600">
                {errors.year}
              </p>
            ) : null}
            {isErrorOnMutation && errorOnMutation.status === 400 ? (
              <p className="mt-2 text-sm text-red-600">
                Cette année est déja enregistrée
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="fiscalTax"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Revenu fiscal
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="fiscalTax"
                name="fiscalTax"
                type="text"
                aria-invalid="true"
                aria-describedby="fiscalTax-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.fiscalTax}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.fiscalTax && errors.fiscalTax ? (
                  <p id="fiscalTax-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.fiscalTax && errors.fiscalTax ? (
              <p id="fiscalTax-error" className="mt-2 text-sm text-red-600">
                {errors.fiscalTax}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="payedTax"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Impôt sur le revenu
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="payedTax"
                name="payedTax"
                type="text"
                aria-invalid="true"
                aria-describedby="payedTax-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm "
                onChange={handleChange}
                value={values.payedTax}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.payedTax && errors.payedTax ? (
                  <p id="payedTax-error" className="text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.payedTax && errors.payedTax ? (
              <p id="payedTax-error" className="mt-2 text-sm text-red-600">
                {errors.payedTax}
              </p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="socialTax"
              className="block text-sm/6 font-medium text-gray-900"
            >
              CSG
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="socialTax"
                name="socialTax"
                type="text"
                aria-invalid="true"
                aria-describedby="socialTax-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm"
                onChange={handleChange}
                value={values.socialTax}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.socialTax && errors.socialTax ? (
                  <p id="socialTax-error" className="text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.socialTax && errors.socialTax ? (
              <p id="socialTax-error" className="mt-2 text-sm text-red-600">
                {errors.socialTax}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <p className="text-xs px-4 lg:py-4">* Champs obligatoires</p>
      <div className="flex items-center justify-between gap-x-6 p-4">
        <div className="flex">
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-50 mr-4 shadow-sm"
            onClick={handleClose}
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
        {patrimonyId ? (
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-100"
            onClick={openConfirmDeleteModal}
          >
            Supprimer
          </button>
        ) : null}
      </div>
    </form>
  );
}
