import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { BankDetailFormViewModel } from "@pages/Config/BankDetails/BankDetailForm.viewmodel";

export default function BankDetailForm() {
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
  } = BankDetailFormViewModel();

  if (isPending) return <SmallSpinner />;
  if (isError) return <p>Une erreur s'est produite</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div>
        <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          {isUpdate ? "Modifier le RIB" : "Ajouter un nouveau RIB"}
        </div>
        <div className="pb-4 lg:pb-12 px-4">
          <div className="mt-6 lg:mt-10 flex flex-col lg:flex-row gap-4 lg:gap-8 ">
            <div className="h-full flex-1 flex flex-col justify-between gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Nom du RIB
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
                      <p id="name-error" className="text-sm text-red-600 ">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500 "
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
                <label
                  htmlFor="bank"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Banque *
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="bank"
                    name="bank"
                    type="text"
                    aria-invalid="true"
                    aria-describedby="bank-error"
                    className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleChange}
                    value={values.bank}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.bank && errors.bank ? (
                      <p id="bank-error" className="text-sm text-red-600 ">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.bank && errors.bank ? (
                  <p id="bank-error" className="mt-2 text-sm text-red-600">
                    {errors.bank}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="bic"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  BIC/SWIFT *
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="bic"
                    name="bic"
                    type="text"
                    placeholder="Ex. ABCDFRPP ou ABCDFRPPXXX"
                    aria-invalid="true"
                    aria-describedby="bic-error"
                    className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm "
                    onChange={handleChange}
                    value={values.bic}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.bic && errors.bic ? (
                      <p id="bic-error" className="text-sm text-red-600">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.bic && errors.bic ? (
                  <p id="bic-error" className="mt-2 text-sm text-red-600">
                    {errors.bic}
                  </p>
                ) : null}
                {isErrorOnMutation &&
                errorOnMutation.status === 409 &&
                errorOnMutation?.response.data.context?.error?.field ===
                  "bic" ? (
                  <p className="mt-2 text-sm text-red-600">
                    Ce BIC est déjà enregistré
                  </p>
                ) : null}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="iban"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  IBAN *
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="iban"
                    name="iban"
                    type="text"
                    placeholder="Ex. FR76 3000 6000 0112 3456 7890 189"
                    aria-invalid="true"
                    aria-describedby="iban-error"
                    className="block w-full rounded-md border-gray-300 py-1.5 pr-2 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs lg:placeholder:text-sm"
                    onChange={handleChange}
                    value={values.iban}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.iban && errors.iban ? (
                      <p id="iban-error" className="text-sm text-red-600">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.iban && errors.iban ? (
                  <p id="iban-error" className="mt-2 text-sm text-red-600">
                    {errors.iban}
                  </p>
                ) : null}
                {isErrorOnMutation &&
                errorOnMutation.status === 409 &&
                errorOnMutation?.response.data.context?.error?.field ===
                  "iban" ? (
                  <p className="mt-2 text-sm text-red-600">
                    Cet IBAN est déjà enregistré
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description / Note interne
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
      </div>
      <p className="text-xs px-4 lg:py-4">* Champs obligatoires</p>
      <div className="flex items-center justify-between gap-x-6 p-4">
        <div className="flex">
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-50 mr-4 shadow-sm"
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
            Supprimer le RIB
          </button>
        ) : null}
      </div>
    </form>
  );
}
