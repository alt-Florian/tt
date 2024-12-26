import { ConfigTable } from "@components/tables/ConfigTable";
import { BigSpinner } from "@components/ui/Spinner";
import NatureListViewModel from "@pages/Config/Nature/NatureList.viewmodel";

export default function NatureList() {
  const { scope, data, isPending, isError, skip } = NatureListViewModel();
  if (isPending) return <BigSpinner className="mt-6" />;
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
