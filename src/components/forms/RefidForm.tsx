import SelectWithSearch from "@components/ui/SelectWithSearch";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { RefIdFormViewModel } from "./RefIdForm.viewmodel";

interface RefIdFormPropsInterface {
  handleClose: () => void;
  id: string;
}

export default function RefIdForm({
  handleClose,
  id,
}: RefIdFormPropsInterface) {
  const {
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    isPending,
    isError,
    isPendingOnMutation,
    customersList,
  } = RefIdFormViewModel(handleClose, id);

  if (isPending) return <SmallSpinner />;
  if (isError)
    return <p>Une erreur s'est produite lors du chargement des données</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div className="">
        <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          Ajouter une personne de référence
        </div>
        <div className="pb-8 px-4">
          <div className="mt-6 flex gap-8 ">
            <div className="h-full flex-1 flex flex-col justify-between gap-4">
              <label className="text-sm font-semibold mb-[-8px]">
                Personne de référence *
              </label>
              <SelectWithSearch
                list={customersList.map((customer) => ({
                  id: customer.id.toString(),
                  name: customer.name,
                }))}
                value={values.refId}
                onChange={(value) => {
                  setFieldValue("refId", value);
                }}
              />
              {touched.refId && errors.refId ? (
                <p id="refId-error" className="mt-2 text-sm text-red-600">
                  {errors.refId}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs px-4 py-2">* Champs obligatoires</p>
      <div className="flex items-center justify-between gap-x-6 p-4">
        <button
          type="button"
          className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-50 mr-4"
          onClick={() => handleClose()}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPendingOnMutation}
          className="flex items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold border rounded-md border-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isPendingOnMutation && <ButtonSpinner />}
          <span>Enregistrer le référent</span>
        </button>
      </div>
    </form>
  );
}
