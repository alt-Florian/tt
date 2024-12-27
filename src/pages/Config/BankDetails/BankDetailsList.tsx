import { ConfigTable } from "@components/tables/ConfigTable";
import PageLoader from "@components/ui/PageLoader";
import { BigSpinner } from "@components/ui/Spinner";
import BankDetailListViewModel from "@pages/Config/BankDetails/BankDetailsList.viewmodel";

export default function BankDetailList() {
  const { scope, data, isPending, isError, skip } = BankDetailListViewModel();
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
