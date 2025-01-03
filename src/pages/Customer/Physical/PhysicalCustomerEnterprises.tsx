import { SmallSpinner } from "@components/ui/Spinner";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import {
  BuildingOffice2Icon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { PhysicalCustomerEnterprisesViewModel } from "@pages/Customer/Physical/PhysicalCustomerEnterprise.viewmodel";
import Globals from "@utils/Globals";
import { getPercentage } from "@utils/percentage";
import { useParams } from "react-router-dom";

export default function PhysicalCustomerEnterprises() {
  const { id } = useParams();
  if (!id) {
    return <p>L'id du client n'est pas défini</p>;
  }

  const { dataEnterprise, isPendingEnterprise, isErrorEnterprise } =
    PhysicalCustomerEnterprisesViewModel(id);

  if (isPendingEnterprise) return <SmallSpinner />;
  if (isErrorEnterprise) return <p>Une erreur s'est produite</p>;
  if (!dataEnterprise) return <p>AUcune donnée disponible</p>;

  const { shareholders, directors } = dataEnterprise.datas;

  return (
    <div className="flex flex-col gap-2">
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
          <div className="flex gap-2 py-2 px-4 border-b border-gray-200 text-gray-500 text-xs lg:text-sm">
            <span className="min-w-40 flex-[2] mr-6">Nom</span>
            {Globals.typeShares.map((type, index) => (
              <span key={index} className="flex-1">
                {type.text}
              </span>
            ))}
            <span className="flex-1">Pourcentage</span>
            <PencilIcon className="lg:hidden size-5 text-white/0" />
            <span className="hidden lg:inline text-white">Editer</span>
          </div>
          {shareholders?.map((shareholder) => (
            <div
              key={shareholder._id}
              className="flex gap-2 py-2 px-4 border-b border-gray-200"
            >
              <div className="min-w-40 flex-[2] flex justify-start items-center gap-4 mr-6">
                <BuildingOffice2Icon className="size-6 lg:size-8 flex-shrink-0" />
                <div className="flex flex-1 flex-col">
                  <div className="flex gap-1 lg:gap-2 items-center">
                    <span className=" text-xs lg:text-sm">
                      {
                        Globals.rSocials.find(
                          (item) =>
                            item.value === shareholder.refId.row_infos.rSocial
                        )?.text
                      }{" "}
                      {shareholder.refId.name}
                    </span>
                    <span className="text-xs lg:text-sm bg-gray-100 border border-gray-200 rounded-md px-1 lg:px-1.5 py-0 lg:py-0.5">
                      {shareholder.refId.customer === true
                        ? "Client"
                        : "Contact"}
                    </span>
                  </div>
                </div>
              </div>
              {Globals.typeShares.map((type, index) => (
                <div key={index} className="flex-1 text-xs lg:text-sm">
                  {shareholder.shares.find(
                    (share) => share.category === type.value
                  )?.owned || "-"}
                </div>
              ))}
              <div className="flex-1 text-xs lg:text-sm">
                {getPercentage(shareholders, shareholder)}
              </div>
              <PencilIcon className="lg:hidden size-5 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer" />
              <a
                href=""
                className="hidden lg:inline text-indigo-600 hover:text-indigo-800"
              >
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
        <div className="text-sm">
          {directors?.map((director) => (
            <div className="flex gap-2 py-2 px-4 border-b border-gray-200">
              <div className="min-w-40 flex-[1.5] flex items-center gap-4">
                <UserCircleIcon className="size-6 lg:size-8 flex-shrink-0" />
                <span className="text-xs lg:text-sm">
                  {
                    Globals.rFunction.find(
                      (item) => item.value === director.rFunction
                    )?.text
                  }
                </span>
              </div>
              {director.refId.type === "1" ? (
                <div className="flex-[3] flex items-center gap-2">
                  <UserCircleIcon className="size-6 lg:size-8 flex-shrink-0" />{" "}
                  <span className="text-xs lg:text-sm">
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
                <div className="flex-[3] flex items-center gap-2">
                  <BuildingOffice2Icon className="size-6 lg:size-8 flex-shrink-0" />{" "}
                  <span className="text-xs lg:text-sm">
                    {
                      Globals.rSocials.find(
                        (item) =>
                          item.value === director.refId.row_infos.rSocial
                      )?.text
                    }
                  </span>
                  <span className="text-xs lg:text-sm">
                    {director.refId.name.toUpperCase()}
                  </span>
                </div>
              )}
              <PencilIcon className="lg:hidden size-5 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer" />
              <a
                href=""
                className="hidden lg:inline text-indigo-600 hover:text-indigo-800"
              >
                Éditer
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
