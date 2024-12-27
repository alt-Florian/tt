import { ConfigTable } from "@components/tables/ConfigTable";
import BlockListViewModel from "./BlockList.viewmodel";

import PageLoader from "@components/ui/PageLoader";

export default function BlockList() {
  const { scope, data, isPending, isError, skip } = BlockListViewModel();
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
