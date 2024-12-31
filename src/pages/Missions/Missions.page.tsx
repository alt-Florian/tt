import { PlusIcon } from "@heroicons/react/20/solid";
import { Column, EnhancedTable } from "@components/ui/table/EnhancedTable";
import { useMissionsViewModel } from "./Missions.viewmodel";
import { useNavigate } from "react-router-dom";
import { tableHelper } from "@utils/table";
import { userService } from "@services/User.service";
import { letterTemplateService } from "@services/config/LetterTemplate.service";
import PageLoader from "@components/ui/PageLoader";
import { useColumnPreferencesStore } from "@stores/ColumnPreferences.store";
import { useState } from "react";
import { enumScope } from "@enums/Filter.enum";

export default function MissionsPage() {
  const {
    data,
    columns,
    filters,
    handleSearch, 
    handleFilter,
    skip,
    isLoading,
    error 
  } = useMissionsViewModel();

  const navigate = useNavigate()
  const onPaginationChange = (newSkip: number) => navigate(`/missions?skip=${newSkip}`);

  const { users, isLoading: isLoadingUsers } = userService.getCached();
  const { lettersTemplate, isLoading: isLoadingTemplates } = letterTemplateService.getCached();

   if (users && lettersTemplate) {
    tableHelper.setUsers(users);
    tableHelper.setLettersTemplate(lettersTemplate);
  }

    const { getColumnPreference, setColumnPreference } = useColumnPreferencesStore();
  const [currentColumns, setCurrentColumns] = useState<Column[]>(() => 
    getColumnPreference(enumScope.MISSIONS, columns)
  );

  const handleColumnChange = (newColumns: Column[]) => {
    setCurrentColumns(newColumns);
    setColumnPreference(enumScope.MISSIONS, newColumns);
  };
  
  if (isLoading || isLoadingUsers || isLoadingTemplates)  return (<PageLoader isLoading={isLoading} message="Chargement des données..."/>);
  if (error) return <div>Une erreur est survenue</div>;

  return (
     
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Missions</h1>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" />
          Créer une lettre de mission
        </button>
      </div>

      <EnhancedTable
        data={data?.datas}
        columns={currentColumns}
        filters={filters}
        onSearch={handleSearch}
        onFilter={handleFilter}
        skip={skip}
        count={data?.paginate.count || 0}
        take={data?.paginate.take || 0}
        onColumnChange={handleColumnChange}
        onPaginationChange={onPaginationChange}
        transformer={tableHelper}
        path='/mission'
        scope={enumScope.MISSIONS}
      />
      </div>

  );
}