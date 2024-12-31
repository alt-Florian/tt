import PatrimonyCorporateForm from "@components/forms/PatrimonyCorporateForm";
import { Badge } from "@components/ui/Badge";
import { PencilIcon } from "@heroicons/react/24/outline";
import { patrimonyService } from "@services/customer/Patrimony.service";
import { useModalBoxStore } from "@stores/modalbox.store";
import { PatrimonyExtendProps } from "./PhysicalPatrimonyExtend";

export default function CorporatePatrimonyExtend({ id }: PatrimonyExtendProps) {
  const { showModalBox, hideModalBox } = useModalBoxStore();
  const { data, isPending, isError } =
    patrimonyService.getCustomerPatrimony(id);

  const openPatrimonyCorporateForm = (patrimonyId?: string) => {
    showModalBox({
      content: (
        <PatrimonyCorporateForm
          handleClose={hideModalBox}
          id={id}
          patrimonyId={patrimonyId}
        />
      ),
      handleCloseModal: hideModalBox,
    });
  };

  if (isPending) {
    return <p>Chargement en cours</p>;
  }
  if (isError) {
    return <p>Une erreur s'est produite</p>;
  }
  const { datas: patrimony } = data.datas;

  return (
    <div className="text-sm">
      <div className="flex gap-6 lg:gap-10 py-2 px-1 lg:px-4 border-b border-gray-200 text-gray-500 ">
        <span className="flex-1 lg:mr-4">Années</span>
        <span className="flex-1">Capitaux propres</span>
        <span className="flex-1">Chiffre d'affaires</span>
        <span className="flex-1">Résultat net</span>
        <span className="flex-1">Actif net</span>
        <span className="flex-1">Effectif</span>
        <span className="flex-1">TVA</span>
        <span className="flex-1">IS</span>
        <PencilIcon className="lg:hidden size-5 text-white/0" />
        <span className="hidden lg:inline text-white">Editer</span>
      </div>
      {patrimony &&
        patrimony.map((patrimony, index) => (
          <div
            key={index}
            className="flex gap-4 lg:gap-10 py-2 px-1 lg:px-4 border-b border-gray-200"
          >
            <span className="flex-1 lg:mr-4 font-semibold">
              {patrimony.year}
            </span>
            <span className="flex-1">
              {patrimony.equity || "-"}
              {patrimony.equity ? " €" : null}
            </span>
            <span className="flex-1">
              {patrimony.ca || "-"}
              {patrimony.ca ? " €" : null}
            </span>
            <span className="flex-1">
              {patrimony.netResult || "-"}
              {patrimony.netResult ? " €" : null}
            </span>
            <span className="flex-1">
              {patrimony.netAsset || "-"}
              {patrimony.netAsset ? " €" : null}
            </span>
            <span className="flex-1">{patrimony.effectif || "-"}</span>
            <span className="flex-1">
              {patrimony.VAT !== undefined ? (
                patrimony.VAT ? (
                  <Badge
                    text={"Oui"}
                    bgColor="bg-green-50"
                    textColor="text-green-700"
                    ringColor="ring-green-600/20"
                  />
                ) : (
                  <Badge
                    text={"Non"}
                    bgColor="bg-red-50"
                    textColor="text-red-700"
                    ringColor="ring-red-600/20"
                  />
                )
              ) : (
                "-"
              )}
            </span>
            <span className="flex-1">
              {patrimony.corporateTax !== undefined ? (
                patrimony.corporateTax ? (
                  <Badge
                    text={"Oui"}
                    bgColor="bg-green-50"
                    textColor="text-green-700"
                    ringColor="ring-green-600/20"
                  />
                ) : (
                  <Badge
                    text={"Non"}
                    bgColor="bg-red-50"
                    textColor="text-red-700"
                    ringColor="ring-red-600/20"
                  />
                )
              ) : (
                "-"
              )}
            </span>
            <PencilIcon className="lg:hidden size-5 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer" />
            <button
              onClick={() => openPatrimonyCorporateForm(patrimony._id)}
              className="hidden lg:inline text-indigo-600 hover:text-indigo-800"
            >
              Éditer
            </button>
          </div>
        ))}
    </div>
  );
}
