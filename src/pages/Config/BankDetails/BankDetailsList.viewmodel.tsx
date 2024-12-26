import { configListService } from "@services/config/ConfigList.service";
import Globals from "@utils/Globals";
import { useSearchParams } from "react-router-dom";

export default function BankDetailListViewModel() {
  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  const scope = 5;
  const config = Globals.configTypes.find((config) => config.scope === scope);
  const display = config?.display || [];

  const { data, isPending, isError } = configListService.getDatasForConfigPage(
    scope,
    skip,
    display
  );

  return { scope, data, isPending, isError, skip };
}
