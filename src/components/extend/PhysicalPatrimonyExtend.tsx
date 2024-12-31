import PatrimonyPhysicalForm from "@components/forms/PatrimonyPhysicalForm";
import { PencilIcon } from "@heroicons/react/24/outline";
import { patrimonyService } from "@services/customer/Patrimony.service";
import { useModalBoxStore } from "@stores/modalbox.store";

export interface PatrimonyExtendProps {
  id: string;
}
export default function PhysicalPatrimonyExtend({ id }: PatrimonyExtendProps) {
  const { showModalBox, hideModalBox } = useModalBoxStore();
  const { data, isPending, isError } =
    patrimonyService.getCustomerPatrimony(id);

  const openPatrimonyPhysicalForm = (patrimonyId?: string) => {
    showModalBox({
      content: (
        <PatrimonyPhysicalForm
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
      <div className="flex gap-16 lg:gap-24 py-2 px-1 lg:px-4 border-b border-gray-200 text-gray-500 ">
        <span className="flex-1 lg:mr-4">Années</span>
        <span className="flex-1">Revenu fiscal</span>
        <span className="flex-1">IR</span>
        <span className="flex-1">CSG</span>
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
              {patrimony.fiscalTax || "-"}
              {patrimony.fiscalTax ? " €" : null}
            </span>
            <span className="flex-1">
              {patrimony.payedTax || "-"}
              {patrimony.payedTax ? " €" : null}
            </span>
            <span className="flex-1">
              {patrimony.socialTax || "-"}
              {patrimony.socialTax ? " €" : null}
            </span>
            <PencilIcon className="lg:hidden size-5 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer" />
            <button
              onClick={() => openPatrimonyPhysicalForm(patrimony._id)}
              className="hidden lg:inline text-indigo-600 hover:text-indigo-800"
            >
              Éditer
            </button>
          </div>
        ))}
    </div>
  );
}
