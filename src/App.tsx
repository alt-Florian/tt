import { CardResumeTask, CardTimer } from "@components/ui/CardTimer";
import Layout from "@components/ui/Layout/Layout";
import Overlays from "@components/ui/Layout/Overlay";
import { BuildingOfficeIcon } from "@heroicons/react/20/solid";
import BankDetailForm from "@pages/Config/BankDetails/BankDetailForm.page";
import BankDetailList from "@pages/Config/BankDetails/BankDetailsList";
import BlockForm from "@pages/Config/Block/BlockForm.page";
import BlockList from "@pages/Config/Block/BlockList";
import ConfigPage from "@pages/Config/Config.page";
import CustomerConfigForm from "@pages/Config/CustomerConfig/CustomerConfigForm.page";
import CustomerConfigList from "@pages/Config/CustomerConfig/CustomerConfigList";
import LetterTemplateForm from "@pages/Config/LetterTemplate/LetterTemplateForm.page";
import LetterTemplateList from "@pages/Config/LetterTemplate/LetterTemplateList";
import NatureForm from "@pages/Config/Nature/NatureForm.page";
import NatureList from "@pages/Config/Nature/NatureList";
import PriceForm from "@pages/Config/Price/PriceForm.page";
import PriceList from "@pages/Config/Price/PriceList";
import TaskForm from "@pages/Config/Task/TaskForm.page";
import TaskList from "@pages/Config/Task/TaskList";
import CorporateCustomerEnterprises from "@pages/Customer/Corporate/CorporateCustomerEnterprises";
import CorporateCustomerFilePage from "@pages/Customer/Corporate/CorporateCustomerFile.page";
import CorporateCustomerProfile from "@pages/Customer/Corporate/CorporateCustomerProfile";
import Missions from "@pages/Customer/Corporate/Missions";
import PhysicalCustomerEnterprises from "@pages/Customer/Physical/PhysicalCustomerEnterprises";
import PhysicalCustomerFilePage from "@pages/Customer/Physical/PhysicalCustomerFile.page";
import PhysicalCustomerProfile from "@pages/Customer/Physical/PhysicalCustomerProfile";
import HomePage from "@pages/Home/Home.page";
import MissionPage from "@pages/Mission/Mission.page";
import SignInPage from "@pages/SignIn/SignIn.page";
import UsersListPage from "@pages/User/UsersList.page";
import { useMissionStore } from "@stores/Mission.store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MissionsPage from "@pages/Missions/Missions.page";
import { Navigate, Route, Routes } from "react-router-dom";

interface IRoute {
  path: string;
  element: JSX.Element;
  children?: { path?: string; element: JSX.Element; index?: boolean }[];
}

function App() {

  const {
    showResumeCard,
    currentTask,
    resumeLastTask,
    closeResumeCard,
    togglePauseTimer,
    stopTaskTimer,
  } = useMissionStore();


  const routesWithoutLayout: IRoute[] = [

    { path: "/signin", element: <SignInPage /> },
  ];
  const routesWithLayout: IRoute[] = [
    { path: "/", element: <HomePage /> },
    { path: "/users", element: <UsersListPage /> },
         { path: "/missions", element: <MissionsPage /> },
    { path: "/mission", element: <MissionPage /> },
    {
      path: "/configs",
      element: <ConfigPage />,
      children: [
        { index: true, element: <Navigate to="bank-details" replace /> },
        { path: "bank-details", element: <BankDetailList /> },
        { path: "letter-templates", element: <LetterTemplateList /> },
        { path: "natures", element: <NatureList /> },
        { path: "prices", element: <PriceList /> },
        { path: "blocks", element: <BlockList /> },
        { path: "tasks", element: <TaskList /> },
        { path: "customer-configs", element: <CustomerConfigList /> },
      ],
    },
    { path: "/configs/bank-detail-form/:id?", element: <BankDetailForm /> },
    {
      path: "/configs/letter-template-form/:id?",
      element: <LetterTemplateForm />,
    },
    { path: "/configs/block-form/:id?", element: <BlockForm /> },
    { path: "/configs/nature-form/:id?", element: <NatureForm /> },
    { path: "/configs/price-form/:id?", element: <PriceForm /> },
    { path: "/configs/task-form/:id?", element: <TaskForm /> },
    { path: "/configs/customer-form/:id?", element: <CustomerConfigForm /> },
    {
      path: "/customers/physical/:id",
      element: <PhysicalCustomerFilePage />,
      children: [
        { index: true, element: <Navigate to="profile" replace /> },
        { path: "profile", element: <PhysicalCustomerProfile /> },
        { path: "enterprises", element: <PhysicalCustomerEnterprises /> },
        { path: "missions", element: <Missions /> },
      ],
    },
    {
      path: "/customers/corporate/:id",
      element: <CorporateCustomerFilePage />,
      children: [
        { index: true, element: <Navigate to="profile" replace /> },
        { path: "profile", element: <CorporateCustomerProfile /> },
        { path: "enterprises", element: <CorporateCustomerEnterprises /> },
        { path: "missions", element: <Missions /> },
      ],
    },

  ];

  return (
    <>
      <Routes>
        {routesWithoutLayout.map((route: IRoute, index: number) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/" element={<Layout />}>
          {routesWithLayout.map((route: IRoute, index: number) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={childRoute.element}
                  index={childRoute.index}
                />
              ))}
            </Route>
          ))}
        </Route>
      </Routes>


      {showResumeCard && !currentTask && (
        <div className="fixed bottom-4 right-4">
          <CardResumeTask onResume={resumeLastTask} onClose={closeResumeCard} />
        </div>
      )}


      {currentTask && (
        <div className="fixed bottom-4 right-4">
          <CardTimer
            title={currentTask.title}
            description={currentTask.description}
            companyName={currentTask.companyName}
            time={currentTask.time} // ex: "00:13:33"
            icon={<BuildingOfficeIcon className="h-4 w-4 text-white" />}
            isPaused={currentTask.isPaused} 
            onTogglePause={() => { togglePauseTimer(); }}
            onStop={() => { stopTaskTimer(); }}
          />
        </div>
      )}

      <Overlays />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
