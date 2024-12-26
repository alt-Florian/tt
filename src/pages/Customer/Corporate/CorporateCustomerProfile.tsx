import EditableDate from "@components/ui/EditableDate";
import EditableText from "@components/ui/EditableText";
import EditableTextWithSelect from "@components/ui/EditableTextWithSelect";
import { SmallSpinner } from "@components/ui/Spinner";
import Toggle from "@components/ui/Toggle";
import {
  ArrowsPointingOutIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  MinusCircleIcon,
  PhoneIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { CorporateCustomerProfileViewModel } from "@pages/Customer/Corporate/CorporateCustomerProfile.viewmodel";
import Globals from "@utils/Globals";
import { fr } from "date-fns/locale/fr";
import dayjs from "dayjs";
import { registerLocale } from "react-datepicker";
import { useParams } from "react-router-dom";
registerLocale("es", fr);

export default function CorporateCustomerProfile() {
  const { id } = useParams();
  if (!id) {
    return <p>L'id du client n'est pas défini</p>;
  }

  const {
    dataProfile,
    isPendingProfile,
    isErrorProfile,
    transformData,
    openPossessionsModal,
    openAddActiveForm,
    openPatrimonyModal,
    toggleRelations,
    setToggleRelations,
    togglePatrimony,
    setTogglePatrimony,
    handleUpdate,
  } = CorporateCustomerProfileViewModel(id);

  if (isPendingProfile) return <SmallSpinner />;
  if (isErrorProfile) return <p>Une erreur s'est produite</p>;
  if (!dataProfile) return <p>Données indisponibles</p>;

  const {
    relations,
    patrimony,
    possessions,
    name,
    customer,
    email1,
    refType,
    row_infos,
    bigExpert,
  } = transformData(dataProfile);
  console.log("🚀 ~ CorporateCustomerProfile ~ bigExpert:", bigExpert);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-4 mt-4">
      <div className="lg:w-3/5 flex flex-col gap-2 order-1 lg:order-none">
        <section className="border border-gray-200 rounded-md">
          <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
            <h2 className="font-semibold">Relations</h2>
            <div className="flex items-center gap-2 text-sm">
              <Toggle
                checked={toggleRelations}
                onChange={() => setToggleRelations(!toggleRelations)}
                label="Vue graphique"
              />
              <button className="p-2 ml-4 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm">
                <ArrowsPointingOutIcon className="size-4 " />
              </button>
              <button
                type="button"
                className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
              >
                <PlusCircleIcon className="size-4 mr-2" />
                Ajouter
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-wrap gap-2">
              {relations?.map((relation) => (
                <div
                  key={relation._id}
                  className="min-w-[220px] w-[calc(33.333%-0.5rem)] flex flex-col gap-4 border border-gray-200 rounded-md p-4"
                >
                  <div className="flex justify-between gap-8 items-center border-b border-gray-200 pb-2">
                    <div>
                      <p className="font-semibold text-sm">
                        {Globals.civilities.find(
                          (civility) =>
                            civility.value ===
                            relation.refId.row_infos.civilities
                        )?.short || "X."}{" "}
                        {relation.refId.row_infos.firstname ?? "Xxxx"}{" "}
                        {relation.refId.name}
                      </p>
                      <p className="text-[13px] text-gray-500">
                        {relation.rType &&
                          Globals.rTypesPerso.find(
                            (rTypePerso) => rTypePerso.value === relation.rType
                          )?.text}
                        {relation.rFunction &&
                          Globals.rTypesPro.find(
                            (rTypePro) => rTypePro.value === relation.rFunction
                          )?.text}
                      </p>
                    </div>
                    <EllipsisVerticalIcon className="size-5 text-gray-500 cursor-pointer" />
                  </div>
                  <div className="flex flex-col gap-1 text-gray-500 text-xs">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="size-4" />
                      <span>{relation.refId.email1 || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="size-4" />
                      <span>{relation.refId.row_infos.phone1 || "-"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {relations && relations.length > 3 ? (
              <button className="text-sm underline self-start text-indigo-600 hover:text-indigo-800">
                {`Afficher toutes les relations (${relations.length})`}
              </button>
            ) : null}
          </div>
        </section>
        <section className="border border-gray-200 rounded-md">
          <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
            <h2 className="font-semibold">Données comptables</h2>
            <div className="flex items-center gap-2 text-sm">
              <Toggle
                checked={togglePatrimony}
                onChange={() => setTogglePatrimony(!togglePatrimony)}
                label="Vue graphique"
              />
              <button
                className="p-2 ml-4 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
                onClick={openPatrimonyModal}
              >
                <ArrowsPointingOutIcon className="size-4" />
              </button>
              <button
                type="button"
                className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
              >
                <PlusCircleIcon className="size-4 mr-2" />
                Ajouter
              </button>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex gap-2 py-2 px-4 border-b border-gray-200 text-gray-500 ">
              <span className="flex-1">Années</span>
              <span className="flex-1">Capitaux propres</span>
              <span className="flex-1">Chiffre d'affaires</span>
              <span className="flex-1">Résultat net</span>
              <span className="text-white">Editer</span>
            </div>
            {patrimony?.map((patrimony, index) => (
              <div
                key={index}
                className="flex gap-2 py-2 px-4 border-b border-gray-200"
              >
                <span className="flex-1">{patrimony.year}</span>
                <span className="flex-1">
                  {patrimony.equity || "-"}
                  {patrimony.equity && " €"}
                </span>
                <span className="flex-1">
                  {patrimony.ca || "-"}
                  {patrimony.ca && " €"}
                </span>
                <span className="flex-1">
                  {patrimony.netResult || "-"}
                  {patrimony.netResult && " €"}
                </span>
                <a href="" className="text-indigo-600 hover:text-indigo-800">
                  Éditer
                </a>
              </div>
            ))}
          </div>
        </section>
        <section className="border border-gray-200 rounded-md">
          <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
            <h2 className="font-semibold">Actif / Passif</h2>
            <button
              type="button"
              className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
              onClick={openAddActiveForm}
            >
              <PlusCircleIcon className="size-4 mr-2" />
              Ajouter
            </button>
          </div>
          <div className="flex gap-4 p-4 font-semibold">
            <div className="flex-1 flex flex-col border border-gray-200 rounded-md p-4 gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 py-2">
                  <PlusCircleIcon className="size-5" />
                  <span>Actif</span>
                </div>
                <div>
                  {possessions?.actif !== undefined
                    ? `${possessions.actif} €`
                    : "-"}
                </div>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
                onClick={openPossessionsModal}
              >
                Afficher les détails
              </button>
            </div>
            <div className="flex-1 flex flex-col border border-gray-200 rounded-md p-4 gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 py-2">
                  <MinusCircleIcon className="size-5" />
                  <span>Passif</span>
                </div>
                <div>
                  {possessions?.passif !== undefined
                    ? `${possessions.passif} €`
                    : "-"}
                </div>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
                onClick={openPossessionsModal}
              >
                Afficher les détails
              </button>
            </div>
          </div>
        </section>
      </div>
      <aside className="lg:w-2/5 bg-gray-100 border border-gray-200 rounded-md text-sm">
        <div
          className="h-1 rounded-t-md bg-gray-300"
          style={{ backgroundColor: refType?.type.colorCode }}
        ></div>
        <div className="flex justify-between items-center bg-gray-100 border-b border-gray-200 p-4">
          <h2 className="font-semibold">Coordonnées</h2>
        </div>
        <div className="p-4 text-sm/tight">
          <div className="flex flex-col gap-2 pb-6 border-b border-gray-200">
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Type</p>
              <p className="flex-1">{customer ? "Client" : "Contact"}</p>
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Source</p>
              <p className="flex-1">
                {row_infos.isPapperSource
                  ? `Pappers (${dayjs(row_infos.updatedPapper).format(
                      "DD MMMM YYYY"
                    )})`
                  : "Interne"}
              </p>
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Raison sociale</p>
              <EditableTextWithSelect
                selected={
                  Globals.rSocials.find(
                    (rsocial) => rsocial.value === row_infos.rSocial
                  )?.text
                }
                options={Globals.rSocials}
                onUpdate={() => console.log("update")}
                className="flex-1"
                classNameSelect="min-w-20 p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Nom</p>
              <EditableText
                content={name.toUpperCase() || "-"}
                onUpdate={(text: string) => handleUpdate({ name: text })}
                className="flex-1"
                classNameInput="w-full p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Téléphone</p>
              <EditableText
                content={row_infos.phone1 || "-"}
                onUpdate={(text: string) =>
                  handleUpdate({ row_infos: { phone1: text } })
                }
                className="flex-1"
                classNameInput="w-auto p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Date d'immatriculation</p>
              <EditableDate
                date={
                  row_infos.registrationDate
                    ? new Date(row_infos.registrationDate)
                    : new Date()
                }
                onUpdate={(date: Date | null) =>
                  handleUpdate({
                    row_infos: {
                      registrationDate: date?.toISOString() || undefined,
                    },
                  })
                }
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">E-mail</p>
              <EditableText
                content={email1 || "-"}
                onUpdate={(text: string) => handleUpdate({ email1: text })}
                className="flex-1"
                classNameInput=" p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">SIREN</p>
              <EditableText
                content={row_infos.siren || "-"}
                onUpdate={(text: string) =>
                  handleUpdate({ row_infos: { siren: Number(text) } })
                }
                className="flex-1"
                classNameInput=" p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Siège social</p>
              {row_infos.address1 && row_infos.city1 && row_infos.zip1 ? (
                <div className="flex-1">
                  <EditableText
                    content={row_infos.address1 || "-"}
                    onUpdate={(text: string) =>
                      handleUpdate({ row_infos: { address1: text } })
                    }
                    classNameInput="p-0 w-full bg-gray-100 leading-none text-sm"
                  />
                  <div className="flex">
                    <EditableText
                      content={row_infos.city1.toUpperCase() || "-"}
                      onUpdate={(text: string) =>
                        handleUpdate({ row_infos: { city1: text } })
                      }
                      classNameInput="p-0 bg-gray-100 leading-none text-sm"
                    />
                    <span className="pl-1">{`(`}</span>
                    <EditableText
                      content={row_infos.zip1.toString() || "-"}
                      onUpdate={(text: string) =>
                        handleUpdate({ row_infos: { zip1: text } })
                      }
                      classNameInput=" p-0 bg-gray-100 leading-none text-sm"
                    />
                    <span>{`)`}</span>
                  </div>
                </div>
              ) : (
                "-"
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-6 pb-4">
            <div className="flex gap-1">
              <p className="w-40 text-gray-500 ">Greffe du tribunal</p>
              <EditableText
                content={row_infos.courtService || "-"}
                onUpdate={(text: string) =>
                  handleUpdate({ row_infos: { courtService: text } })
                }
                className="flex-1"
                classNameInput=" p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">TVA</p>
              <EditableText
                content={row_infos.vat || "-"}
                onUpdate={(text: string) =>
                  handleUpdate({ row_infos: { vat: text } })
                }
                className="flex-1"
                classNameInput=" p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Capital</p>
              <div className="flex-1">
                <EditableText
                  content={row_infos.capital?.toString() || "-"}
                  onUpdate={(text: string) =>
                    handleUpdate({ row_infos: { capital: Number(text) } })
                  }
                  className="inline"
                  classNameInput=" p-0 bg-gray-100 leading-none text-sm"
                />
                <span>{row_infos.capital && " €"}</span>
              </div>
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">Nombre de titres au capital</p>
              <EditableText
                content={row_infos.shareQty?.toString() || "-"}
                onUpdate={(text: string) =>
                  handleUpdate({ row_infos: { shareQty: Number(text) } })
                }
                className="flex-1"
                classNameInput=" p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
            <div className="flex gap-1">
              <p className="w-40 text-gray-500">BigExpert</p>
              <EditableTextWithSelect
                selected={bigExpert ? "Oui" : "Non"}
                options={[
                  { value: 1, text: "Oui" },
                  { value: 0, text: "Non" },
                ]}
                onUpdate={() => console.log("update")}
                className="flex-1"
                classNameSelect="min-w-20 p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
