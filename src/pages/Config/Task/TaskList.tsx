import { ConfigTable } from "@components/tables/ConfigTable";
import PageLoader from "@components/ui/PageLoader";
import TaskListViewModel from "@pages/Config/Task/TaskList.viewmodel";

export default function TaskList() {
  const { scope, data, isPending, isError, skip } = TaskListViewModel();
  if (isPending) return (<PageLoader isLoading={isPending} message="Chargement des données..."/>);
  if (isError) return <p>Une erreur s'est produite</p>;
  if (!data) return <p>Données indisponibles</p>;
  return (
    <ConfigTable
      filteredDatas={data.filteredDatas}
      skip={skip}
      count={data.paginate.count}
      take={data.paginate.take}
      scope={scope}
    />
  );
}
