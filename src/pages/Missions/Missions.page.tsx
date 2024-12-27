import { PlusIcon } from "@heroicons/react/20/solid";
import { EnhancedTable } from "@components/ui/table/EnhancedTable";
import { useMissionsViewModel } from "./Missions.viewmodel";
import { useNavigate } from "react-router-dom";
import { tableHelper } from "@utils/table";
import { userService } from "@services/User.service";

export default function MissionsPage() {
  const { 
    data, 
    columns, 
    handleSearch, 
    handleFilter,
    skip,
    isLoading,
    error 
  } = useMissionsViewModel();

  const navigate = useNavigate()
  const onPaginationChange = (newSkip: number) => navigate(`/missions?skip=${newSkip}`);

  const { users } = userService.getCached();
  tableHelper.setUsers(users)
  
  if (isLoading) return <div>Chargement...</div>;
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
        columns={columns}
        onSearch={handleSearch}
        onFilter={handleFilter}
        skip={skip}
        count={data?.paginate.count || 0}
        take={data?.paginate.take || 0}
        onPaginationChange={onPaginationChange}
        transformer={tableHelper}
        path='/mission'
      />
    </div>
  );
}