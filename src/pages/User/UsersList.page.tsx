import { UsersTable } from "@components/tables/UsersTable";
import { BigSpinner } from "@components/ui/Spinner";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { UsersListViewModel } from "@pages/User/UsersList.viewmodel";

export default function UsersListPage() {
  const { columns, data, isError, isPending, openModalBox } =
    UsersListViewModel();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-900">Utilisateurs</h1>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm  hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4 sm:mb-0"
          onClick={() => openModalBox()}
        >
          <PlusCircleIcon aria-hidden="true" className="size-5" />
          Ajouter un utilisateur
        </button>
      </div>
      {isPending ? (
        <BigSpinner />
      ) : isError ? (
        <p>Une erreur s'est produite lors du chargement des données</p>
      ) : (
        data && (
          <UsersTable
            columns={columns}
            datas={data.datas}
            count={data.paginate.count}
            take={data.paginate.take}
          />
        )
      )}
    </div>
  );
}
