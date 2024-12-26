import { Badge } from "@components/ui/Badge";
import Select from "@components/ui/Select";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { LetterTemplateFormViewModel } from "@pages/Config/LetterTemplate/LetterTemplateForm.viewmodel";
import Globals from "@utils/Globals";

export default function LetterTemplateForm() {
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
    bankDetails,
    isPending,
    isError,
    isPendingOnMutation,
    isErrorOnMutation,
    errorOnMutation,
  } = LetterTemplateFormViewModel();

  if (isPending) {
    <SmallSpinner />;
  }

  if (isError) {
    <p>Une erreur s'est produite lors du chargement des données</p>;
  }
  return (
    <div className="flex gap-4">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 bg-white rounded-md border border-gray-200 pb-4"
      >
        <div className="space-y-6 lg:space-y-10">
          <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
            {isUpdate
              ? "Modifier le modèle de lettre de mission"
              : "Ajouter un nouveau modèle de lettre de mission"}
          </div>
          <div className="flex flex-col gap-8 mt-10 pb-12 px-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex flex-col justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm/6 mt-2 font-medium text-gray-900"
                >
                  Nom du modèle *
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
                {isErrorOnMutation &&
                errorOnMutation.status === 409 &&
                errorOnMutation?.response.data.context?.error?.field ===
                  "name" ? (
                  <p className="mt-2 text-sm text-red-600">
                    Un modèle avec ce nom existe déjà
                  </p>
                ) : null}
              </div>
              <div className="flex-1 min-w-[240px]">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <Select
                    list={types}
                    label={"Type de lettre *"}
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
              <div className="flex-1 min-w-[240px]">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <Select
                    list={bankDetails}
                    label={"RIB associé *"}
                    value={values.bankDetails}
                    onChange={(e) =>
                      setFieldValue("bankDetails", e.target.value)
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.bankDetails && errors.bankDetails ? (
                      <p
                        id="bankDetails-error"
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
                {touched.bankDetails && errors.bankDetails ? (
                  <p
                    id="bankDetails-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.bankDetails}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <label
                htmlFor="content"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Contenu du modèle *
              </label>
              <div className="relative flex-1 mt-2">
                <textarea
                  id="content"
                  name="content"
                  aria-invalid="true"
                  aria-describedby="content-error"
                  className="block w-full min-h-48 lg:min-h-64 xl:min-h-80 rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6 resize-none"
                  onChange={handleChange}
                  value={values.content}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {touched.content && errors.content ? (
                    <p id="content-error" className="text-sm text-red-600">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </p>
                  ) : null}
                </div>
              </div>
              {touched.content && errors.content ? (
                <p id="content-error" className="mt-2 text-sm text-red-600">
                  {errors.content}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <p className="text-xs px-4 pt-2 pb-8">* Champs obligatoires</p>
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
      <aside className="w-1/4 bg-white rounded-md border border-gray-200">
        <div className="space-y-12">
          <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4 text-sm xl:text-base">
            Variables disponibles
          </div>
          <div className="flex flex-col gap-8 mt-10 pb-12 px-4">
            {Globals.letterTemplateVariables.map((item, index) => {
              return (
                <div key={index}>
                  <Badge
                    text={`{{${item.name}}}`}
                    bgColor="bg-indigo-50"
                    textColor="text-indigo-700"
                    ringColor="ring-indigo-700/10"
                  />
                  <p className="mt-1 ml-2 text-xs lg:text-sm text-gray-900">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
