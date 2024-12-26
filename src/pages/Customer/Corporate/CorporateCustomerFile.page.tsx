import { Breadcrumb } from "@components/ui/Breadcrumbs";
import { BigSpinner, SmallSpinner } from "@components/ui/Spinner";
import { Tabs } from "@components/ui/Tabs";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { BuildingOffice2Icon, PencilIcon } from "@heroicons/react/24/outline";
import { CorporateCustomerFileViewModel } from "@pages/Customer/Corporate/CorporateCustomerFile.viewmodel";
import { Outlet, useParams } from "react-router-dom";

export default function CorporateCustomerFilePage() {
  const { id } = useParams();
  if (!id) {
    return <p>L'id du client n'est pas défini</p>;
  }
  const {
    dataProfile,
    isPendingProfile,
    isErrorProfile,
    transformData,
    tabsData,
    handleBecomeCustomer,
    openRefIdForm,
    handleDeleteCustomer,
    handleDownloadCSV,
  } = CorporateCustomerFileViewModel(id);

  if (isPendingProfile) return <BigSpinner />;
  if (isErrorProfile) return <p>Une erreur s'est produite</p>;
  if (!dataProfile) return <p>Données indisponibles</p>;

  const { pages, name, customer, rSocial, refType, refId } =
    transformData(dataProfile);

  return (
    <>
      <div className="mb-4">
        {isPendingProfile ? <SmallSpinner /> : <Breadcrumb pages={pages} />}
      </div>
      <header className="flex justify-between mb-4">
        <div className="flex items-center gap-4">
          <BuildingOffice2Icon
            className="size-16 text-gray-900"
            style={refType && { color: refType.type.colorCode }}
          />
          <div>
            <h1 className="font-semibold text-3xl lg:text-4xl">
              {rSocial ?? ""} {name}
            </h1>
            <div className="flex gap-4 text-sm">
              <span className="bg-gray-100 border border-gray-200 rounded-md px-1.5 py-0.5">
                {customer === true ? "Client" : "Contact"}
              </span>
              {refType ? (
                <span className="flex items-center gap-2 text-gray-600">
                  <div
                    className={`h-2 w-2 rounded-full`}
                    style={{ backgroundColor: refType.type.colorCode }}
                  ></div>
                  <span>{refType.type.name}</span>
                  <span>{refType.customerId.name}</span>
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-4 items-start justify-center">
          <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 border-none">
              <EllipsisVerticalIcon className=" size-5 mx-3 my-2 text-gray-500 cursor-pointer flex-shrink-0 hover:text-gray-900" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute top-6 left-24 flex flex-col z-10 mt-5 w-screen max-w-max -translate-x-1/2 transition border border-gray-400 data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {!customer && (
                <div
                  className={`flex gap-2 items-center hover:bg-gray-100 hover:cursor-pointer px-4 py-2`}
                  onClick={
                    refId
                      ? () => {
                          handleBecomeCustomer();
                        }
                      : () => {
                          openRefIdForm();
                        }
                  }
                >
                  <ArrowPathIcon className="size-4" />
                  <span className="text-[13px]">
                    Passer de contact à client
                  </span>
                </div>
              )}
              <div
                className="flex gap-2 items-center hover:bg-gray-100 hover:cursor-pointer px-4 py-2 "
                onClick={handleDeleteCustomer}
              >
                <TrashIcon className="size-4" />{" "}
                <span className="text-[13px]">Supprimer la fiche client</span>
              </div>
            </PopoverPanel>
          </Popover>
          <button
            type="button"
            className="flex whitespace-nowrap text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-100 shadow-sm"
            onClick={handleDownloadCSV}
          >
            Exporter (.csv)
          </button>
          <button
            type="button"
            className="flex items-center bg-indigo-600 px-3 py-2 text-sm font-semibold border rounded-md border-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilIcon className="size-4 mr-2" />
            Éditer
          </button>
        </div>
      </header>
      <Tabs tabs={tabsData} />
      <Outlet />
    </>
  );
}
