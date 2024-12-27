import React from "react";
import { BuildingOfficeIcon } from "@heroicons/react/20/solid";
import { MissionCustomerInterface } from "@interfaces/mission/Mission.interface";

export interface MissionCustomerDetailProps {
    customer: MissionCustomerInterface
}

export const MissionCustomerDetail: React.FC<MissionCustomerDetailProps> = ({ customer }) => {
    return (
        <section className="border border-gray-200 rounded-md">
            <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-2 px-4">
                <div className="flex items-center gap-2">
                    <BuildingOfficeIcon className="h-6 w-6 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">
                        {customer.type === "1" && customer.row_infos.civilities
                            ? `${customer.row_infos.civilities === 1 ? "M." : customer.row_infos.civilities === 2 ? "Mme" : ""} ${customer.name}`
                            : customer.name}
                    </h3>
                </div>
                <button
                    className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    type="button"
                >
                    Voir la fiche cliente
                </button>
            </div>

            <div className="bg-white shadow p-4 space-y-3">
                <div className="text-sm text-gray-700 space-y-1">
                    <div className="w-full flex justify-between mb-5">
                        <span className="font-medium">E-mail</span>
                        <a href={`mailto:${customer.email1}`} className="text-black-500 border-b-2">
                            {customer.email1 ? customer.email1 : "-"}
                        </a>
                    </div>
                    <div className="w-full flex justify-between mb-5">
                        <span className="font-medium">N° Téléphone</span>
                        <a href={`tel:${customer.row_infos?.phone1}`} className="text-black-500 border-b-2">
                            {customer?.row_infos.phone1 ? customer.row_infos.phone1 : "-"}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
