import { Tab } from "@components/ui/Tabs";
import Globals from "@utils/Globals";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function ConfigViewModel() {
  const [searchParams] = useSearchParams();
  console.log("🚀 ~ ConfigViewModel ~ searchParams:", searchParams);
  const skip = Number(searchParams.get("skip")) || 0;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const buttonName = Globals.configTypes.find(
    (config) => config.path === pathname
  )?.buttonName;
  const formPath = Globals.configTypes.find(
    (config) => config.path === pathname
  )?.formPath;

  const tabs: Tab[] = Globals.configTypes.map((config) => ({
    name: config.name,
    path: config.path,
  }));
  return { tabs, navigate, buttonName, formPath, skip };
}
