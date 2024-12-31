import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { PatrimonyCorporateFormViewModel } from "./PatrimonyCorporateForm.viewmodel";

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
    setFieldValue,
    isUpdate,
    openConfirmDeleteModal,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  } = PatrimonyCorporateFormViewModel(id, handleClose, patrimonyId);

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
        <div className="flex gap-8 p-4">
          <div className="flex flex-col gap-6 py-4">
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
                htmlFor="equity"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Capitaux propres
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="equity"
                  name="equity"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="equity-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                  onChange={handleChange}
                  value={values.equity}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.equity && errors.equity ? (
                    <p id="equity-error" className="text-sm text-red-600 ">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.equity && errors.equity ? (
                <p id="equity-error" className="mt-2 text-sm text-red-600">
                  {errors.equity}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="ca"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Chiffre d'affaire
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="ca"
                  name="ca"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="ca-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm "
                  onChange={handleChange}
                  value={values.ca}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.ca && errors.ca ? (
                    <p id="ca-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.ca && errors.ca ? (
                <p id="ca-error" className="mt-2 text-sm text-red-600">
                  {errors.ca}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="netResult"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Résultat Net
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="netResult"
                  name="netResult"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="netResult-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm"
                  onChange={handleChange}
                  value={values.netResult}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.netResult && errors.netResult ? (
                    <p id="netResult-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.netResult && errors.netResult ? (
                <p id="netResult-error" className="mt-2 text-sm text-red-600">
                  {errors.netResult}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-6 py-4">
            <div>
              <label
                htmlFor="netAsset"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Actif Net
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="netAsset"
                  name="netAsset"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="netAsset-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm"
                  onChange={handleChange}
                  value={values.netAsset}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.netAsset && errors.netAsset ? (
                    <p id="netAsset-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.netAsset && errors.netAsset ? (
                <p id="netAsset-error" className="mt-2 text-sm text-red-600">
                  {errors.netAsset}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="effectif"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Effectif
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="effectif"
                  name="effectif"
                  type="text"
                  aria-invalid="true"
                  aria-describedby="effectif-error"
                  className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm"
                  onChange={handleChange}
                  value={values.effectif}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.effectif && errors.effectif ? (
                    <p id="effectif-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.effectif && errors.effectif ? (
                <p id="effectif-error" className="mt-2 text-sm text-red-600">
                  {errors.effectif}
                </p>
              ) : null}
            </div>
            <fieldset className="mb-2">
              <legend className="text-sm/6 font-semibold text-gray-900">
                TVA
              </legend>
              <div className="mt-3 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="oui"
                    name="vat"
                    onChange={() => {
                      setFieldValue("VAT", true);
                    }}
                    checked={values.VAT === true}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  />
                  <label
                    htmlFor={"oui"}
                    className="ml-3 block text-sm/6 font-medium text-gray-900"
                  >
                    Oui
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="non"
                    name="vat"
                    onChange={() => {
                      setFieldValue("VAT", false);
                    }}
                    checked={values.VAT === false}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  />
                  <label
                    htmlFor={"non"}
                    className="ml-3 block text-sm/6 font-medium text-gray-900"
                  >
                    Non
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">
                Impôt sur les sociétés
              </legend>
              <div className="mt-3 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="oui"
                    name="corporateTax"
                    onChange={() => {
                      setFieldValue("corporateTax", true);
                    }}
                    checked={values.corporateTax === true}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  />
                  <label
                    htmlFor={"oui"}
                    className="ml-3 block text-sm/6 font-medium text-gray-900"
                  >
                    Oui
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="non"
                    name="corporateTax"
                    onChange={() => {
                      setFieldValue("corporateTax", false);
                    }}
                    checked={values.corporateTax === false}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  />
                  <label
                    htmlFor={"non"}
                    className="ml-3 block text-sm/6 font-medium text-gray-900"
                  >
                    Non
                  </label>
                </div>
              </div>
            </fieldset>
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
