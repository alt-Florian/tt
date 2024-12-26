import { SmallSpinner } from "@components/ui/Spinner";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import {
  BuildingOffice2Icon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { CorporateCustomerEnterprisesViewModel } from "@pages/Customer/Corporate/CorporateCustomerEnterprises.viewmodel";
import Globals from "@utils/Globals";
import { useParams } from "react-router-dom";

export default function CorporateCustomerEnterprises() {
  const { id } = useParams();
  if (!id) {
    return <p>L'id du client n'est pas défini</p>;
  }

  const { dataEnterprise, isPendingEnterprise, isErrorEnterprise } =
    CorporateCustomerEnterprisesViewModel(id);

  if (isPendingEnterprise) return <SmallSpinner />;
  if (isErrorEnterprise) return <p>Une erreur s'est produite</p>;
  if (!dataEnterprise) return <p>Données indisponibles</p>;

  const { shareholders, directors } = dataEnterprise.datas;

  return (
    <div className="flex flex-col gap-2">
      <section className="border border-gray-200 rounded-md">
        <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
          <h2 className="font-semibold">Associés</h2>
          <button
            type="button"
            className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
          >
            <PlusCircleIcon className="size-4 mr-2" />
            Ajouter
          </button>
        </div>
        <div className="text-sm">
          <div className="flex gap-2 py-2 px-4 border-b border-gray-200 text-gray-500 ">
            <span className="flex-[2]">Nom</span>
            {Globals.typeShares.map((type, index) => (
              <span key={index} className="flex-1">
                {type.text}
              </span>
            ))}
            <span className="flex-1">Pourcentage</span>
            <span className="text-white/0">Editer</span>
          </div>
          {shareholders
            ?.filter(
              (shareholder) =>
                shareholder.typeLink === "1" || //personne morale
                shareholder.typeLink === undefined //personne physique
            )
            .map((shareholder) => (
              <div
                key={shareholder._id}
                className="flex gap-2 py-2 px-4 border-b border-gray-200"
              >
                <div className="flex-[2] flex items-center gap-4">
                  {shareholder.typeLink === "1" ? (
                    <BuildingOffice2Icon className="size-8" />
                  ) : (
                    <UserCircleIcon className="size-8" />
                  )}
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <span className="flex-1">
                        {shareholder.typeLink === "1"
                          ? Globals.rSocials.find(
                              (rsocial) =>
                                rsocial.value ===
                                shareholder.refId.row_infos.rSocial
                            )?.text
                          : `${
                              Globals.civilities.find(
                                (civ) =>
                                  civ.value ===
                                  shareholder.refId.row_infos.civilities
                              )?.short
                            } ${shareholder.refId.row_infos.firstname}`}{" "}
                        {shareholder.refId.name.toUpperCase()}
                      </span>
                      <span className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-0.5">
                        {shareholder.refId.customer === true
                          ? "Client"
                          : "Contact"}
                      </span>
                    </div>
                  </div>
                </div>
                {Globals.typeShares.map((type, index) => (
                  <div key={index} className="flex-1 ">
                    {shareholder.shares.find(
                      (share) => share.category === type.value
                    )?.owned || "-"}
                  </div>
                ))}
                <a href="" className="text-indigo-600 hover:text-indigo-800">
                  Éditer
                </a>
              </div>
            ))}
        </div>
      </section>
      <section className="border border-gray-200 rounded-md">
        <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
          <h2 className="font-semibold">Filiales</h2>
          <button
            type="button"
            className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
          >
            <PlusCircleIcon className="size-4 mr-2" />
            Ajouter
          </button>
        </div>
        <div className="text-sm">
          <div className="flex gap-2 py-2 px-4 border-b border-gray-200 text-gray-500 ">
            <span className="flex-[2]">Nom</span>
            {Globals.typeShares.map((type, index) => (
              <span key={index} className="flex-1">
                {type.text}
              </span>
            ))}
            <span className="text-white/0">Editer</span>
          </div>
          {shareholders
            ?.filter((shareholder) => shareholder.typeLink === "2")
            .map((shareholder) => (
              <div
                key={shareholder._id}
                className="flex gap-2 py-2 px-4 border-b border-gray-200"
              >
                <div className="flex-[2] flex items-center gap-4">
                  <BuildingOffice2Icon className="size-8" />
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <span className="flex-1">
                        {
                          Globals.rSocials.find(
                            (rsocial) =>
                              rsocial.value ===
                              shareholder.refId.row_infos.rSocial
                          )?.text
                        }{" "}
                        {shareholder.refId.name}
                      </span>
                      <span className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-0.5">
                        {shareholder.refId.customer === true
                          ? "Client"
                          : "Contact"}
                      </span>
                    </div>
                  </div>
                </div>
                {Globals.typeShares.map((type, index) => (
                  <div key={index} className="flex-1 ">
                    {shareholder.shares.find(
                      (share) => share.category === type.value
                    )?.owned || "-"}
                  </div>
                ))}
                <a href="" className="text-indigo-600 hover:text-indigo-800">
                  Éditer
                </a>
              </div>
            ))}
        </div>
      </section>
      <section className="border border-gray-200 rounded-md">
        <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
          <h2 className="font-semibold">Mandats</h2>
          <button
            type="button"
            className="flex items-center text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
          >
            <PlusCircleIcon className="size-4 mr-2" />
            Ajouter
          </button>
        </div>
        {directors?.map((director) => (
          <div
            key={director._id}
            className="flex gap-2 py-2 px-4 border-b border-gray-200 text-sm"
          >
            <div className="flex-1 flex items-center gap-4">
              <UserCircleIcon className="size-8" />
              <span className="font-semibold">
                {
                  Globals.rFunction.find(
                    (item) => item.value === director.rFunction
                  )?.text
                }
              </span>
            </div>
            <div className="flex-[1.5] flex items-center gap-2">
              {director.refId.type === "1" ? (
                <div className="flex-[1.5] flex items-center gap-2">
                  <UserCircleIcon className="size-8" />{" "}
                  <span>
                    {`${
                      Globals.civilities.find(
                        (civ) =>
                          civ.value === director.refId.row_infos.civilities
                      )?.short
                    } 
                  ${director.refId.row_infos.firstname} 
                  `}
                  </span>
                  <span>{director.refId.name.toUpperCase()}</span>
                </div>
              ) : (
                <div className="flex-[1.5] flex items-center gap-2">
                  <BuildingOffice2Icon className="size-8" />{" "}
                  <span>
                    {
                      Globals.rSocials.find(
                        (item) =>
                          item.value === director.refId.row_infos.rSocial
                      )?.text
                    }
                  </span>
                  <span>{director.refId.name.toUpperCase()}</span>
                </div>
              )}
            </div>
            <a href="" className="text-indigo-600 hover:text-indigo-800">
              Éditer
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}
