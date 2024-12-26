import PossessionsExtendViewModel from "@components/extend/PossessionsExtend.viewmodel";
import AddPossessionForm from "@components/forms/AddPossessionForm";
import EditableText from "@components/ui/EditableText";
import EditableTextWithSelect from "@components/ui/EditableTextWithSelect";
import { ModalBox } from "@components/ui/ModalBox";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Asset } from "@interfaces/customer/Possessions.interface";
import Globals from "@utils/Globals";

interface PossessionsExtendProps {
  id: string;
  handleClose: () => void;
}

export default function PossessionsExtend({
  id,
  handleClose,
}: PossessionsExtendProps) {
  const {
    isPending,
    isError,
    data,
    active,
    passive,
    isFormVisible,
    setIsFormVisible,
    isActive,
    setIsActive,
    updatePossession,
    deletePossession,
  } = PossessionsExtendViewModel(id);

  if (isPending) {
    return <p>Chargement en cours</p>;
  }
  if (isError) {
    return <p>Une erreur s'est produite</p>;
  }
  let assets: Asset[] | undefined = [];
  if (data) {
    assets = data.datas.assets;
  }

  return (
    <div className="flex-flex-col gap-4">
      <header className="flex justify-between  text-gray-900 p-4 mb-4">
        <div>Actif / Passif</div>
        <button onClick={handleClose}>
          <XMarkIcon className="size-4" />
        </button>
      </header>
      <div className="flex gap-2">
        <div className="flex flex-col bg-gray-100 p-4">
          <div className="flex justify-between items-center gap-6 pb-4">
            <div className="flex items-center gap-2 py-2">
              <PlusCircleIcon className="size-5" />
              <span className="text-lg font-semibold">Actif</span>
            </div>
            <div className="text-xl font-semibold">{active ?? "-"} €</div>
            <button
              type="button"
              className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
              onClick={() => setIsFormVisible(true)}
            >
              <PlusIcon className="size-4 mr-2" />
              Ajouter
            </button>
          </div>
          {assets !== undefined &&
            assets
              .filter((asset) => asset.type === "1")
              .map((asset) => (
                <div
                  key={asset._id}
                  className="flex justify-between items-start border-t border-gray-200 py-4"
                >
                  <div>
                    <EditableText
                      content={asset.name}
                      onUpdate={(text) =>
                        updatePossession(asset._id, { ...asset, name: text })
                      }
                      classNameInput="bg-gray-100"
                    />
                    <EditableTextWithSelect
                      selected={
                        Globals.catActive.find(
                          (cat) => cat.value === asset.category
                        )?.text
                      }
                      options={Globals.catActive}
                      onUpdate={(value) => {
                        updatePossession(asset._id, {
                          ...asset,
                          category: Number(value),
                        });
                      }}
                      classNameSelect="text-sm text-gray-900/60"
                      classNameText="text-sm text-gray-900/60"
                      classNameOptions="text-sm text-gray-900/60"
                    />
                  </div>
                  <div className="flex gap-4 items-center">
                    <span>
                      <EditableText
                        content={asset.value.toString()}
                        onUpdate={(text) =>
                          updatePossession(asset._id, {
                            ...asset,
                            value: Number(text),
                          })
                        }
                        className="inline"
                        classNameInput="bg-gray-100"
                      />{" "}
                      €
                    </span>
                    <button onClick={() => deletePossession(asset._id)}>
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex flex-col bg-gray-100 p-4">
          <div className="flex justify-between items-center gap-6 pb-4">
            <div className=" flex items-center gap-2 py-2 ">
              <MinusCircleIcon className="size-5" />
              <span className="text-lg font-semibold">Passif</span>
            </div>
            <div className="text-xl font-semibold">{passive ?? "-"} €</div>
            <button
              type="button"
              className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
              onClick={() => {
                setIsActive(false);
                setIsFormVisible(true);
              }}
            >
              <PlusIcon className="size-4 mr-2" />
              Ajouter
            </button>
          </div>
          {assets !== undefined &&
            assets
              .filter((asset) => asset.type === "2")
              .map((asset) => (
                <div
                  key={asset._id}
                  className="flex justify-between items-start border-t border-gray-200 py-4"
                >
                  <div>
                    <EditableText
                      content={asset.name}
                      onUpdate={(text) =>
                        updatePossession(asset._id, { ...asset, name: text })
                      }
                      classNameInput="bg-gray-100"
                    />
                    <EditableTextWithSelect
                      selected={
                        Globals.catPassive.find(
                          (cat) => cat.value === asset.category
                        )?.text
                      }
                      options={Globals.catPassive}
                      onUpdate={(value) => {
                        updatePossession(asset._id, {
                          ...asset,
                          category: Number(value),
                        });
                      }}
                      classNameSelect="text-sm text-gray-900/60"
                      classNameText="text-sm text-gray-900/60"
                      classNameOptions="text-sm text-gray-900/60"
                    />
                  </div>
                  <div className="flex gap-4 items-center">
                    <span>
                      <EditableText
                        content={asset.value.toString()}
                        onUpdate={(text) =>
                          updatePossession(asset._id, {
                            ...asset,
                            value: Number(text),
                          })
                        }
                        className="inline"
                        classNameInput="bg-gray-100"
                      />{" "}
                      €
                    </span>
                    <button onClick={() => deletePossession(asset._id)}>
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <ModalBox
        open={isFormVisible}
        content={
          <AddPossessionForm
            customerId={id}
            isActive={isActive}
            handleClose={() => setIsFormVisible(false)}
          />
        }
        handleCloseModal={() => setIsFormVisible(false)}
      />
    </div>
  );
}
