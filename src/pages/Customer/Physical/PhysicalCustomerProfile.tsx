import DatePickerButton from "@components/ui/DatePickerButton";
import EditableDate from "@components/ui/EditableDate";
import EditableText from "@components/ui/EditableText";
import EditableTextWithSelect from "@components/ui/EditableTextWithSelect";
import { SmallSpinner } from "@components/ui/Spinner";
import TextButton from "@components/ui/TextButton";
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
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

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
    isErrorUpdate,
    errorUpdate,
    resetUpdateErrors,
    openPatrimonyPhysicalForm,
    handleBigExpert,
  } = PhysicalCustomerProfileViewModel(id);

  if (isPendingProfile) return <SmallSpinner />;
  if (isErrorProfile) return <p>Une erreur s'est produite</p>;
  if (!dataProfile) return <p>Aucune donnée disponible</p>;

  const {
    text,
    age,
    getAge,
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
              <span className="flex-1">Année</span>
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
                <span className="flex-1 font-semibold">{patrimony.year}</span>
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
                <button
                  onClick={() => openPatrimonyPhysicalForm(patrimony._id)}
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
                  <XCircleIcon className="size-5 flex-shrink-0" />
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
              onClick={() => {
                resetUpdateErrors();
                setIsContactDetailsLeft(true);
              }}
            />
            <ChevronRightIcon
              className={`size-5 text-gray-500 flex-shrink-0
                ${isContactDetailsLeft && "cursor-pointer text-gray-900"}`}
              onClick={() => {
                resetUpdateErrors();
                setIsContactDetailsLeft(false);
              }}
            />
          </div>
        </div>
        {isContactDetailsLeft ? (
          <div className="p-4 text-sm/tight">
            <div className="flex flex-col gap-2 pb-6 border-b border-gray-200">
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">E-mail</p>
                {email1 ? (
                  <EditableText
                    content={email1}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ email1: text });
                      } else {
                        handleUpdate({ email1: null });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ email1: text });
                      } else {
                        handleUpdate({ email1: null });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              {isErrorUpdate && errorUpdate.status === 409 ? (
                <p className="text-xs text-red-500">
                  Il existe déjà un client avec cet email
                </p>
              ) : null}
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">N° Téléphone</p>
                {row_infos.phone1 ? (
                  <EditableText
                    content={row_infos.phone1}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { phone1: text } });
                      } else {
                        handleUpdate({ row_infos: { phone1: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { phone1: text } });
                      } else {
                        handleUpdate({ row_infos: { phone1: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <p className="text-gray-500">Adresse :</p>
              <div className="flex gap-4">
                <div className="w-40 text-gray-500 text-xs flex flex-col gap-1">
                  <p className="italic"> - Numéro et rue</p>
                  <p className="italic"> - Code postal</p>
                  <p className="italic"> - Ville</p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col">
                    {row_infos.address1 ? (
                      <EditableText
                        content={row_infos.address1}
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { address1: text } });
                          } else {
                            handleUpdate({ row_infos: { address1: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    ) : (
                      <TextButton
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { address1: text } });
                          } else {
                            handleUpdate({ row_infos: { address1: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    )}
                    {row_infos.zip1 ? (
                      <EditableText
                        content={row_infos.zip1}
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { zip1: text } });
                          } else {
                            handleUpdate({ row_infos: { zip1: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    ) : (
                      <TextButton
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { zip1: text } });
                          } else {
                            handleUpdate({ row_infos: { zip1: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    )}
                    {row_infos.city1 ? (
                      <EditableText
                        content={row_infos.city1}
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { city1: text } });
                          } else {
                            handleUpdate({ row_infos: { city1: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    ) : (
                      <TextButton
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { city1: text } });
                          } else {
                            handleUpdate({ row_infos: { city1: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Date de naissance</p>
                <div className="flex-1">
                  {row_infos.birthday ? (
                    <div className="flex gap-2">
                      <EditableDate
                        date={new Date(row_infos.birthday)}
                        onUpdate={(date: Date | null) =>
                          handleUpdate({
                            row_infos: {
                              birthday: date?.toISOString() || null,
                              minority: date ? getAge(date) < 18 : null,
                            },
                          })
                        }
                      />
                      <XCircleIcon
                        className="size-4 cursor-pointer mt-[1px]"
                        onClick={() =>
                          handleUpdate({
                            row_infos: {
                              birthday: null,
                            },
                          })
                        }
                      />
                    </div>
                  ) : (
                    <DatePickerButton
                      onUpdate={(date: Date | null) =>
                        handleUpdate({
                          row_infos: {
                            birthday: date?.toISOString() || null,
                          },
                        })
                      }
                    />
                  )}
                  {age !== undefined ? `(${age} ans)` : null}
                </div>
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">N° Sécurité sociale</p>
                {row_infos.nin ? (
                  <EditableText
                    content={row_infos.nin?.toString() || ""}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { nin: Number(text) } });
                      } else {
                        handleUpdate({ row_infos: { nin: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { nin: Number(text) } });
                      } else {
                        handleUpdate({ row_infos: { nin: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-6 pb-4">
              <div className="flex gap-4">
                <p className="w-40 text-gray-500 ">État civil</p>
                <EditableTextWithSelect
                  selected={
                    Globals.civilStats.find(
                      (item) => item.value === row_infos.civilStats
                    )?.text
                  }
                  options={Globals.civilStats}
                  onUpdate={(value: string | number) => {
                    value === "5"
                      ? handleUpdate({
                          row_infos: {
                            civilStats: Number(value),
                            die: true,
                          },
                        })
                      : handleUpdate({
                          row_infos: {
                            civilStats: Number(value),
                            die: false,
                          },
                        });
                  }}
                  className="flex-1 "
                  classNameSelect=" w-full p-1 bg-gray-100 leading-none text-sm"
                />
              </div>
              {row_infos.civilStats === 1 ||
              row_infos.civilStats === 3 ||
              row_infos.civilStats === 4 ? (
                <div className="flex gap-4">
                  {row_infos.civilStats === 1 ? (
                    <p className="w-40 text-gray-500">Date du divorce</p>
                  ) : (
                    <p className="w-40 text-gray-500">Date de l'union</p>
                  )}
                  {row_infos.unionDate ? (
                    <>
                      <EditableDate
                        date={new Date(row_infos.unionDate)}
                        onUpdate={(date: Date | null) =>
                          handleUpdate({
                            row_infos: {
                              unionDate: date?.toISOString() || null,
                            },
                          })
                        }
                      />
                      <XCircleIcon
                        className="size-4 cursor-pointer mt-[1px]"
                        onClick={() =>
                          handleUpdate({
                            row_infos: {
                              unionDate: null,
                            },
                          })
                        }
                      />
                    </>
                  ) : (
                    <div className="flex gap-4 ">
                      <DatePickerButton
                        onUpdate={(date: Date | null) =>
                          handleUpdate({
                            row_infos: {
                              unionDate: date?.toISOString() || null,
                            },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              ) : null}
              {row_infos.civilStats === 3 || row_infos.civilStats === 4 ? (
                <div className="flex gap-4">
                  <p className="w-40 text-gray-500">Lieu de l'union</p>
                  {row_infos.unionPlace ? (
                    <EditableText
                      content={row_infos.unionPlace || ""}
                      onUpdate={(text: string) => {
                        if (text !== "") {
                          handleUpdate({ row_infos: { unionPlace: text } });
                        } else {
                          handleUpdate({ row_infos: { unionPlace: null } });
                        }
                      }}
                      className="flex-1"
                      classNameInput="p-0 bg-gray-100 leading-none text-sm"
                    />
                  ) : (
                    <TextButton
                      onUpdate={(text: string) => {
                        if (text !== "") {
                          handleUpdate({ row_infos: { unionPlace: text } });
                        } else {
                          handleUpdate({ row_infos: { unionPlace: null } });
                        }
                      }}
                      className="flex-1"
                      classNameInput="p-0 bg-gray-100 leading-none text-sm"
                    />
                  )}
                </div>
              ) : null}
              {row_infos.civilStats === 5 ? (
                row_infos.dieDate ? (
                  <div className="flex gap-4">
                    <EditableDate
                      date={new Date(row_infos.dieDate)}
                      onUpdate={(date: Date | null) =>
                        handleUpdate({
                          row_infos: {
                            dieDate: date?.toISOString() || null,
                          },
                        })
                      }
                    />
                    <XCircleIcon
                      className="size-4 cursor-pointer mt-[1px]"
                      onClick={() =>
                        handleUpdate({
                          row_infos: {
                            dieDate: null,
                          },
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className="flex gap-4 ">
                    <p className="w-40 text-gray-500">Date de décès</p>
                    <DatePickerButton
                      onUpdate={(date: Date | null) =>
                        handleUpdate({
                          row_infos: {
                            dieDate: date?.toISOString() || null,
                          },
                        })
                      }
                    />
                  </div>
                )
              ) : null}
              {(row_infos.civilStats === 3 || row_infos.civilStats === 4) && (
                <div className="flex gap-4">
                  <p className="w-40 text-gray-500">Régime matrimonial</p>
                  <EditableTextWithSelect
                    selected={
                      row_infos.civilStats === 3
                        ? Globals.contractMarriedRegime.find(
                            (item) =>
                              item.value === row_infos.marriageSettlement
                          )?.text ?? "Inconnu"
                        : Globals.contractPacsRegime.find(
                            (item) =>
                              item.value === row_infos.marriageSettlement
                          )?.text ?? "Inconnu"
                    }
                    options={
                      row_infos.civilStats === 3
                        ? Globals.contractMarriedRegime
                        : Globals.contractPacsRegime
                    }
                    onUpdate={(value: string | number) =>
                      handleUpdate({
                        row_infos: { marriageSettlement: Number(value) },
                      })
                    }
                    className="flex-1 "
                    classNameSelect="w-full p-1 bg-gray-100 leading-none text-sm"
                  />
                </div>
              )}
              {row_infos.civilStats === 3 && row_infos.civilities === 2 ? (
                <div className="flex gap-4">
                  <p className="w-40 text-gray-500">Nom de naissance</p>
                  {row_infos.birthName ? (
                    <EditableText
                      content={row_infos.birthName}
                      onUpdate={(text: string) => {
                        if (text !== "") {
                          handleUpdate({ row_infos: { birthName: text } });
                        } else {
                          handleUpdate({ row_infos: { birthName: null } });
                        }
                      }}
                      className="flex-1"
                      classNameInput="p-0 bg-gray-100 leading-none text-sm"
                    />
                  ) : (
                    <TextButton
                      onUpdate={(text: string) => {
                        if (text !== "") {
                          handleUpdate({ row_infos: { birthName: text } });
                        } else {
                          handleUpdate({ row_infos: { birthName: null } });
                        }
                      }}
                      className="flex-1"
                      classNameInput="p-0 bg-gray-100 leading-none text-sm"
                    />
                  )}
                </div>
              ) : null}
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Lieu de naissance</p>
                {row_infos.birthLocation ? (
                  <EditableText
                    content={row_infos.birthLocation}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { birthLocation: text } });
                      } else {
                        handleUpdate({ row_infos: { birthLocation: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { birthLocation: text } });
                      } else {
                        handleUpdate({ row_infos: { birthLocation: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Nationalité</p>
                {row_infos.nationality ? (
                  <EditableText
                    content={row_infos.nationality}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { nationality: text } });
                      } else {
                        handleUpdate({ row_infos: { nationality: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { nationality: text } });
                      } else {
                        handleUpdate({ row_infos: { nationality: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4 pt-6">
                <p className="w-40 text-gray-500">BigExpert</p>
                <EditableTextWithSelect
                  selected={bigExpert ? "Oui" : "Non"}
                  options={[
                    { value: 0, text: "Non" },
                    { value: 1, text: "Oui" },
                  ]}
                  onUpdate={(value) => {
                    if (Number(value) === 0) {
                      handleBigExpert({ bigExpert: false });
                    }
                    if (Number(value) === 1) {
                      handleBigExpert({ bigExpert: true });
                    }
                  }}
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
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">E-mail secondaire</p>
                {row_infos.email2 ? (
                  <EditableText
                    content={row_infos.email2}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { email2: text } });
                      } else {
                        handleUpdate({ row_infos: { email2: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { email2: text } });
                      } else {
                        handleUpdate({ row_infos: { email2: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">N° Téléphone secondaire</p>
                {row_infos.phone2 ? (
                  <EditableText
                    content={row_infos.phone2}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { phone2: text } });
                      } else {
                        handleUpdate({ row_infos: { phone2: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { phone2: text } });
                      } else {
                        handleUpdate({ row_infos: { phone2: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <p className="text-gray-500">Adresse secondaire :</p>
              <div className="flex gap-4">
                <div className="w-40 text-gray-500 text-xs flex flex-col gap-1">
                  <p className="italic"> - Numéro et rue</p>
                  <p className="italic"> - Code postal</p>
                  <p className="italic"> - Ville</p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col">
                    {row_infos.address2 ? (
                      <EditableText
                        content={row_infos.address2}
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { address2: text } });
                          } else {
                            handleUpdate({ row_infos: { address2: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    ) : (
                      <TextButton
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { address2: text } });
                          } else {
                            handleUpdate({ row_infos: { address2: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    )}
                    {row_infos.zip2 ? (
                      <EditableText
                        content={row_infos.zip2}
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { zip2: text } });
                          } else {
                            handleUpdate({ row_infos: { zip2: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    ) : (
                      <TextButton
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { zip2: text } });
                          } else {
                            handleUpdate({ row_infos: { zip2: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    )}
                    {row_infos.city2 ? (
                      <EditableText
                        content={row_infos.city2}
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { city2: text } });
                          } else {
                            handleUpdate({ row_infos: { city2: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    ) : (
                      <TextButton
                        onUpdate={(text: string) => {
                          if (text !== "") {
                            handleUpdate({ row_infos: { city2: text } });
                          } else {
                            handleUpdate({ row_infos: { city2: null } });
                          }
                        }}
                        className="flex-1"
                        classNameInput="p-0 bg-gray-100 leading-none text-sm"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 py-4">
              <p className="w-40 text-gray-500">Note</p>
              {infos ? (
                <EditableText
                  content={infos}
                  isTextArea
                  onUpdate={(text: string) => {
                    if (text !== "") {
                      handleUpdate({ infos: text });
                    } else {
                      handleUpdate({ infos: null });
                    }
                  }}
                  className="flex-1"
                  classNameInput="p-0 bg-gray-100 leading-none text-sm"
                />
              ) : (
                <TextButton
                  isTextArea
                  onUpdate={(text: string) => {
                    if (text !== "") {
                      handleUpdate({ infos: text });
                    } else {
                      handleUpdate({ infos: null });
                    }
                  }}
                  className="flex-1"
                  classNameInput="p-0 bg-gray-100 leading-none text-sm"
                />
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
