import DatePickerButton from "@components/ui/DatePickerButton";
import EditableDate from "@components/ui/EditableDate";
import EditableText from "@components/ui/EditableText";
import EditableTextWithSelect from "@components/ui/EditableTextWithSelect";
import { SmallSpinner } from "@components/ui/Spinner";
import TextButton from "@components/ui/TextButton";
import Toggle from "@components/ui/Toggle";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  ArrowsPointingOutIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  PhoneIcon,
  PlusCircleIcon,
  XCircleIcon,
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
    isContactDetailsLeft,
    setIsContactDetailsLeft,
    handleUpdate,
    isErrorUpdate,
    errorUpdate,
    resetUpdateErrors,
    handleBigExpert,
    openPatrimonyCorporateForm,
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
                onClick={() => openPatrimonyCorporateForm()}
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
                <span className="flex-1 font-semibold">{patrimony.year}</span>
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
                <button
                  onClick={() => openPatrimonyCorporateForm(patrimony._id)}
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
                  <XCircleIcon className="size-5" />
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
                <p className="w-40 text-gray-500">Type</p>
                <p className="flex-1">{customer ? "Client" : "Contact"}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Source</p>
                <p className="flex-1">
                  {row_infos.isPapperSource
                    ? `Pappers (${dayjs(row_infos.updatedPapper).format(
                        "DD MMMM YYYY"
                      )})`
                    : "Interne"}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Raison sociale</p>
                <EditableTextWithSelect
                  selected={
                    Globals.rSocials.find(
                      (rsocial) => rsocial.value === row_infos.rSocial
                    )?.text
                  }
                  options={Globals.rSocials}
                  onUpdate={(value: string | number) =>
                    handleUpdate({
                      row_infos: { rSocial: Number(value) },
                    })
                  }
                  className="flex-1"
                  classNameSelect="min-w-20 p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Nom</p>
                {name ? (
                  <EditableText
                    content={name}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ name: text });
                      } else {
                        handleUpdate({ name: null });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ name: text });
                      } else {
                        handleUpdate({ name: null });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Téléphone</p>
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
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Date d'immatriculation</p>
                {row_infos.registrationDate ? (
                  <div className="flex gap-2">
                    <EditableDate
                      date={new Date(row_infos.registrationDate)}
                      onUpdate={(date: Date | null) =>
                        handleUpdate({
                          row_infos: {
                            registrationDate: date?.toISOString() || undefined,
                          },
                        })
                      }
                    />
                    <XCircleIcon
                      className="size-4 cursor-pointer mt-[1px]"
                      onClick={() =>
                        handleUpdate({
                          row_infos: {
                            registrationDate: null,
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
                          registrationDate: date?.toISOString() || null,
                        },
                      })
                    }
                  />
                )}
              </div>
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
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">SIREN</p>
                {row_infos.siren ? (
                  <EditableText
                    content={row_infos.siren}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { siren: Number(text) } });
                      } else {
                        handleUpdate({ row_infos: { siren: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { siren: Number(text) } });
                      } else {
                        handleUpdate({ row_infos: { siren: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              {isErrorUpdate && errorUpdate.status === 403 ? (
                <p className="text-xs text-red-500">
                  Ce SIREN est déja utilisé
                </p>
              ) : null}
              <p className=" text-gray-500">Siège social :</p>
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
            </div>
            <div className="flex flex-col gap-2 pt-6 pb-4">
              <div className="flex gap-4">
                <p className="w-40 text-gray-500 ">Greffe du tribunal</p>
                {row_infos.courtService ? (
                  <EditableText
                    content={row_infos.courtService}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { courtService: text } });
                      } else {
                        handleUpdate({ row_infos: { courtService: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { courtService: text } });
                      } else {
                        handleUpdate({ row_infos: { courtService: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">TVA</p>
                {row_infos.vat ? (
                  <EditableText
                    content={row_infos.vat}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { vat: text } });
                      } else {
                        handleUpdate({ row_infos: { vat: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { vat: text } });
                      } else {
                        handleUpdate({ row_infos: { vat: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Capital</p>
                <div className="flex-1 flex gap-2">
                  {row_infos.capital ? (
                    <EditableText
                      content={row_infos.capital.toString()}
                      onUpdate={(text: string) => {
                        if (text !== "") {
                          handleUpdate({
                            row_infos: { capital: Number(text) },
                          });
                        } else {
                          handleUpdate({ row_infos: { capital: null } });
                        }
                      }}
                      className="inline"
                      classNameInput="p-0 bg-gray-100 leading-none text-sm"
                    />
                  ) : (
                    <TextButton
                      onUpdate={(text: string) => {
                        if (text !== "") {
                          handleUpdate({
                            row_infos: { capital: Number(text) },
                          });
                        } else {
                          handleUpdate({ row_infos: { capital: null } });
                        }
                      }}
                      classNameInput="p-0 bg-gray-100 leading-none text-sm"
                    />
                  )}
                  <span>{row_infos.capital && " €"}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">
                  Nombre de titres au capital
                </p>
                {row_infos.shareQty ? (
                  <EditableText
                    content={row_infos.shareQty.toString()}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { shareQty: Number(text) } });
                      } else {
                        handleUpdate({ row_infos: { shareQty: null } });
                      }
                    }}
                    className="inline"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { shareQty: Number(text) } });
                      } else {
                        handleUpdate({ row_infos: { shareQty: null } });
                      }
                    }}
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4">
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
          </div>
        ) : (
          <div className="p-4 text-sm/tight">
            <div className="flex flex-col gap-2 pb-6 border-b border-gray-200">
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Code NAF</p>
                {row_infos.nafCode ? (
                  <EditableText
                    content={row_infos.nafCode}
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { nafCode: text } });
                      } else {
                        handleUpdate({ row_infos: { nafCode: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                ) : (
                  <TextButton
                    onUpdate={(text: string) => {
                      if (text !== "") {
                        handleUpdate({ row_infos: { nafCode: text } });
                      } else {
                        handleUpdate({ row_infos: { nafCode: null } });
                      }
                    }}
                    className="flex-1"
                    classNameInput="p-0 bg-gray-100 leading-none text-sm"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">Date de dépôt de bilan</p>
                {row_infos.closureDate ? (
                  <div className="flex gap-2">
                    <EditableDate
                      date={new Date(row_infos.closureDate)}
                      onUpdate={(date: Date | null) =>
                        handleUpdate({
                          row_infos: {
                            closureDate: date?.toISOString() || undefined,
                          },
                        })
                      }
                    />
                    <XCircleIcon
                      className="size-4 cursor-pointer mt-[1px]"
                      onClick={() =>
                        handleUpdate({
                          row_infos: {
                            closureDate: null,
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
                          closureDate: date?.toISOString() || null,
                        },
                      })
                    }
                  />
                )}
              </div>
              <div className="flex gap-4">
                <p className="w-40 text-gray-500">
                  Période de clôture comptable
                </p>

                <EditableTextWithSelect
                  selected={
                    Globals.months.find(
                      (month) => month.text === row_infos.closingAccounts
                    )?.text
                  }
                  options={Globals.months}
                  onUpdate={(value) =>
                    handleUpdate({
                      row_infos: {
                        closingAccounts:
                          Globals.months.find((month) => month.value === value)
                            ?.text || null,
                      },
                    })
                  }
                  className="flex-1"
                  classNameSelect="min-w-20 p-0 bg-gray-100 leading-none text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
