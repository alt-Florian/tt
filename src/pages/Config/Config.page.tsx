import { Tabs } from "@components/ui/Tabs";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Outlet } from "react-router-dom";
import ConfigViewModel from "./Config.viewmodel";

export default function ConfigPage() {
  const { tabs, navigate, buttonName, formPath, skip } = ConfigViewModel();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex justify-between mb-4">
        <h1 className="text-4xl font-semibold text-black mb-4 sm:mb-0">
          Configurations
        </h1>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4 sm:mb-0"
          onClick={() => navigate(`${formPath}?skip=${skip}`)}
        >
          <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
          Ajouter {buttonName}
        </button>
      </div>
      <Tabs tabs={tabs} />
      <Outlet />
    </div>
  );
}
