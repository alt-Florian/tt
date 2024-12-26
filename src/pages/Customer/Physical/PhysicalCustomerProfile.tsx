import EditableDate from "@components/ui/EditableDate";
import EditableText from "@components/ui/EditableText";
import EditableTextWithSelect from "@components/ui/EditableTextWithSelect";
import { SmallSpinner } from "@components/ui/Spinner";
import Toggle from "@components/ui/Toggle";
import {
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  PhoneIcon,
  Square2StackIcon,
} from "@heroicons/react/20/solid";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import { PhysicalCustomerProfileViewModel } from "@pages/Customer/Physical/PhysicalCustomerProfile.viewmodel";
import Globals from "@utils/Globals";
import { useParams } from "react-router-dom";

export default function PhysicalCustomerProfile() {
  const { id } = useParams();
  if (!id) {
    return <p>L'id du client n'est pas défini</p>;
  }
  const {
    dataProfile,
    isPendingProfile,
    isErrorProfile,
    transformData,
    isContactDetailsLeft,
    setIsContactDetailsLeft,
    copyStatus,
    handleCopy,
    openPossessionsModal,
    openAddPossessionForm,
    openPatrimonyModal,
    toggleRelations,
    setToggleRelations,
    togglePatrimony,
    setTogglePatrimony,
    navigate,
    handleUpdate,
    openPatrimonyPhysicalForm,
  } = PhysicalCustomerProfileViewModel(id);

  if (isPendingProfile) return <SmallSpinner />;
  if (isErrorProfile) return <p>Une erreur s'est produite</p>;
  if (!dataProfile) return <p>Aucune donnée disponible</p>;

  const {
    text,
    age,
    relations,
    patrimony,
    possessions,
    row_infos,
    email1,
    infos,
    refType,
    bigExpert,
  } = transformData(dataProfile);

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
                onClick={() => navigate("")}
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
                        {relation.refId.row_infos.firstname ?? "Xxxxxx"}{" "}
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
                    <EllipsisVerticalIcon className="size-5 text-gray-500 cursor-pointer flex-shrink-0" />
                  </div>
                  <div className="flex flex-col gap-1 text-gray-500 text-xs">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="size-4 flex-shrink-0" />
                      <span>{relation.refId.email1 || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="size-4 flex-shrink-0" />
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
            <h2 className="font-semibold">Patrimoines</h2>
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
                <ArrowsPointingOutIcon className="size-4 flex-shrink-0" />
              </button>
              <button
                type="button"
                className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
                onClick={() => openPatrimonyPhysicalForm()}
              >
                <PlusCircleIcon className="size-4 mr-2 flex-shrink-0" />
                Ajouter
              </button>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex gap-2 py-2 px-4 border-b border-gray-200 text-gray-500 ">
              <span className="flex-1">Années</span>
              <span className="flex-1">Revenu fiscal</span>
              <span className="flex-1">IR</span>
              <span className="flex-1">CSG</span>
              <span className="text-white">Editer</span>
            </div>
            {patrimony?.map((patrimony, index) => (
              <div
                key={index}
                className="flex gap-2 py-2 px-4 border-b border-gray-200"
              >
                <span className="flex-1">{patrimony.year}</span>
                <span className="flex-1">
                  {patrimony.fiscalTax || "-"}
                  {patrimony.fiscalTax && " €"}
                </span>
                <span className="flex-1">
                  {patrimony.payedTax || "-"}
                  {patrimony.payedTax && " €"}
                </span>
                <span className="flex-1">
                  {patrimony.socialTax || "-"}
                  {patrimony.socialTax && " €"}
                </span>
                <button
                  onClick={() => openPatrimonyPhysicalForm(index.toString())}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Éditer
                </button>
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
              onClick={openAddPossessionForm}
            >
              <PlusCircleIcon className="size-4 mr-2 flex-shrink-0" />
              Ajouter
            </button>
          </div>
          <div className="flex gap-4 p-4 font-semibold">
            <div className="flex-1 flex flex-col border border-gray-200 rounded-md p-4 gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 py-2">
                  <PlusCircleIcon className="size-5 flex-shrink-0" />
                  <span>Actif</span>
                </div>
                <div>
                  {possessions?.actif !== undefined
                    ? `${possessions.actif} €`
                    : "-"}
                </div>
              </div>
              {possessions ? (
                <button
                  type="button"
                  className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
                  onClick={openPossessionsModal}
                >
                  Afficher les détails
                </button>
              ) : null}
            </div>
            <div className="flex-1 flex flex-col border border-gray-200 rounded-md p-4 gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 py-2">
                  <MinusCircleIcon className="size-5 flex-shrink-0" />
                  <span>Passif</span>
                </div>
                <div>
                  {possessions?.passif !== undefined
                    ? `${possessions.passif} €`
                    : "-"}
                </div>
              </div>
              {possessions ? (
                <button
                  type="button"
                  className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
                  onClick={openPossessionsModal}
                >
                  Afficher les détails
                </button>
              ) : null}
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
          <div className="flex gap-2">
            <ChevronLeftIcon
              className={`size-5 cursor-pointer flex-shrink-0 ${
                isContactDetailsLeft && "text-gray-500 cursor-normal"
              }`}
              onClick={() => setIsContactDetailsLeft(true)}
            />
            <ChevronRightIcon
              className={`size-5 text-gray-500 flex-shrink-0
                ${isContactDetailsLeft && "cursor-pointer text-gray-900"}`}
              onClick={() => setIsContactDetailsLeft(false)}
            />
          </div>
        </div>
        {isContactDetailsLeft ? (
          <div className="p-4 text-sm/tight">
            <div className="flex flex-col gap-2 pb-6 border-b border-gray-200">
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">E-mail</p>
                <EditableText
                  content={email1 || "-"}
                  onUpdate={(text: string) => handleUpdate({ email1: text })}
                  className="flex-1"
                  classNameInput="p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">N° Téléphone</p>
                <EditableText
                  content={row_infos.phone1 || "-"}
                  onUpdate={(text: string) =>
                    handleUpdate({ row_infos: { phone1: text } })
                  }
                  className="flex-1"
                  classNameInput="p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">Adresse</p>
                {row_infos.address1 && row_infos.city1 && row_infos.zip1 ? (
                  <div className="flex-1">
                    <EditableText
                      content={row_infos.address1 || "-"}
                      onUpdate={(text: string) =>
                        handleUpdate({ row_infos: { address1: text } })
                      }
                      className="w-full"
                      classNameInput="p-0 w-full bg-gray-100 leading-none text-sm"
                    />
                    <div className="flex">
                      <EditableText
                        content={row_infos.city1.toUpperCase() || "-"}
                        onUpdate={(text: string) =>
                          handleUpdate({
                            row_infos: { city1: text.toUpperCase() },
                          })
                        }
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                      <span className="pl-1">{`(`}</span>
                      <EditableText
                        content={row_infos.zip1.toString() || "-"}
                        onUpdate={(text: string) =>
                          handleUpdate({
                            row_infos: { zip1: text },
                          })
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
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">Date de naissance</p>
                <div className="flex-1">
                  <EditableDate
                    date={
                      row_infos.birthday
                        ? new Date(row_infos.birthday)
                        : new Date()
                    }
                    onUpdate={(date: Date | null) =>
                      handleUpdate({
                        row_infos: {
                          birthday: date?.toISOString() || undefined,
                        },
                      })
                    }
                  />{" "}
                  {age !== undefined ? `(${age} ans)` : null}
                </div>
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">N° Sécurité sociale</p>
                <EditableText
                  content={row_infos.nin?.toString() || "-"}
                  onUpdate={(text: string) =>
                    handleUpdate({
                      row_infos: { nin: Number(text) },
                    })
                  }
                  className="inline"
                  classNameInput=" p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-6 pb-6">
              <div className="flex gap-1">
                <p className="w-40 text-gray-500 ">État civil</p>
                <EditableTextWithSelect
                  selected={
                    Globals.civilStats.find(
                      (item) => item.value === row_infos.civilStats
                    )?.text
                  }
                  options={Globals.civilStats}
                  onUpdate={() => console.log("update")}
                  className="flex-1 "
                  classNameSelect=" w-full p-1 bg-gray-100 leading-none text-sm"
                />
                {(row_infos.civilStats === 3 || row_infos.civilStats === 4) && (
                  <span>{`(le ${(
                    <EditableDate
                      date={
                        row_infos.unionDate
                          ? new Date(row_infos.unionDate)
                          : new Date()
                      }
                      onUpdate={(date: Date | null) =>
                        handleUpdate({
                          row_infos: {
                            unionDate: date?.toISOString() || undefined,
                          },
                        })
                      }
                    />
                  )})`}</span>
                )}
                {row_infos.civilStats === 5 && (
                  <span>{`(le ${(
                    <EditableDate
                      date={
                        row_infos.dieDate
                          ? new Date(row_infos.dieDate)
                          : new Date()
                      }
                      onUpdate={(date: Date | null) =>
                        handleUpdate({
                          row_infos: {
                            dieDate: date?.toISOString() || undefined,
                          },
                        })
                      }
                    />
                  )})`}</span>
                )}
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">Régime matrimonial</p>
                <EditableTextWithSelect
                  selected={
                    Globals.marriageSettlement.find(
                      (item) => item.value === row_infos.marriageSettlement
                    )?.text
                  }
                  options={Globals.marriageSettlement}
                  onUpdate={() => console.log("update")}
                  className="flex-1 "
                  classNameSelect="w-full p-1 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">Lieu de naissance</p>
                <EditableText
                  content={row_infos.birthLocation?.toUpperCase() || "-"}
                  onUpdate={(text: string) =>
                    handleUpdate({
                      row_infos: { birthLocation: text },
                    })
                  }
                  className="inline"
                  classNameInput=" p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">Nationalité</p>
                <EditableText
                  content={row_infos.nationality || "-"}
                  onUpdate={(text: string) =>
                    handleUpdate({
                      row_infos: { nationality: text },
                    })
                  }
                  className="inline"
                  classNameInput=" p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-1 pt-6">
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
            <div className="flex flex-col gap-4">
              <p className=" text-gray-500">Mentions pour contrat</p>
              <div className="flex gap-2 p-3 border border-gray-200 bg-white">
                <p className=" text-[13px] min-h-16">{text}</p>
                {text ? (
                  <div className="flex flex-col gap-2 items-center">
                    <button
                      className={`self-end bg-indigo-600 text-white rounded-md p-2 ${
                        copyStatus && "bg-indigo-400"
                      }`}
                      disabled={copyStatus}
                    >
                      <Square2StackIcon
                        className="size-4"
                        onClick={() => handleCopy(text)}
                      />
                    </button>
                    {copyStatus && (
                      <p className="text-indigo-600 text-xs">Copié!</p>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 text-sm/tight">
            <div className="flex flex-col gap-2 pb-6 border-b border-gray-200">
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">E-mail secondaire</p>
                <EditableText
                  content={row_infos.email2 || "-"}
                  onUpdate={(text: string) =>
                    handleUpdate({
                      row_infos: { email2: text },
                    })
                  }
                  className="inline"
                  classNameInput=" p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">N° Téléphone secondaire</p>
                <EditableText
                  content={row_infos.phone2 || "-"}
                  onUpdate={(text: string) =>
                    handleUpdate({
                      row_infos: { phone2: text },
                    })
                  }
                  className="inline"
                  classNameInput=" p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-1">
                <p className="w-40 text-gray-500">Adresse secondaire</p>
                {row_infos.address2 && row_infos.city2 && row_infos.zip2 ? (
                  <div className="flex-1">
                    <EditableText
                      content={row_infos.address2 || "-"}
                      onUpdate={(text: string) =>
                        handleUpdate({
                          row_infos: { address2: text },
                        })
                      }
                      className="w-full"
                      classNameInput="p-0 w-full bg-gray-100 leading-none text-sm"
                    />
                    <div className="flex">
                      <EditableText
                        content={row_infos.city2.toUpperCase() || "-"}
                        onUpdate={(text: string) =>
                          handleUpdate({
                            row_infos: { city2: text },
                          })
                        }
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                      <span className="pl-1">{`(`}</span>
                      <EditableText
                        content={row_infos.zip2.toString() || "-"}
                        onUpdate={(text: string) =>
                          handleUpdate({
                            row_infos: { zip2: text },
                          })
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
            <div className="flex flex-col gap-2 py-4">
              <p className="w-40 text-gray-500">Note</p>
              <EditableText
                content={infos || "-"}
                onUpdate={(text: string) =>
                  handleUpdate({
                    infos: text,
                  })
                }
                className="inline"
                classNameInput=" p-0 bg-gray-100 leading-none text-sm"
              />
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
