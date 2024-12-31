import { CardResumeTask, CardTimer } from "@components/ui/CardTimer";
import Layout from "@components/ui/Layout/Layout";
import Overlays from "@components/ui/Layout/Overlay";
import AuthGuard from "@components/ui/AuthGuard";
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



function App() {
  const {
    showResumeCard,
    currentTask,
    resumeLastTask,
    closeResumeCard,
    togglePauseTimer,
    stopTaskTimer,
  } = useMissionStore();

  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
          
        <Route element={<AuthGuard><Layout /></AuthGuard>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersListPage />} />
    
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/mission/:id" element={<MissionPage />} />
          <Route path="/configs" element={<ConfigPage />}>
            <Route index element={<Navigate to="bank-details" replace />} />
            <Route path="bank-details" element={<BankDetailList />} />
            <Route path="letter-templates" element={<LetterTemplateList />} />
            <Route path="natures" element={<NatureList />} />
            <Route path="prices" element={<PriceList />} />
            <Route path="blocks" element={<BlockList />} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="customer-configs" element={<CustomerConfigList />} />
          </Route>
          <Route path="/configs/bank-detail-form/:id?" element={<BankDetailForm />} />
          <Route path="/configs/letter-template-form/:id?" element={<LetterTemplateForm />} />
          <Route path="/configs/block-form/:id?" element={<BlockForm />} />
          <Route path="/configs/nature-form/:id?" element={<NatureForm />} />
          <Route path="/configs/price-form/:id?" element={<PriceForm />} />
          <Route path="/configs/task-form/:id?" element={<TaskForm />} />
          <Route path="/configs/customer-form/:id?" element={<CustomerConfigForm />} />
          <Route path="/customers/physical/:id" element={<PhysicalCustomerFilePage />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<PhysicalCustomerProfile />} />
            <Route path="enterprises" element={<PhysicalCustomerEnterprises />} />
            <Route path="missions" element={<Missions />} />
          </Route>
          <Route path="/customers/corporate/:id" element={<CorporateCustomerFilePage />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<CorporateCustomerProfile />} />
            <Route path="enterprises" element={<CorporateCustomerEnterprises />} />
            <Route path="missions" element={<Missions />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
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
            time={currentTask.time}
            icon={<BuildingOfficeIcon className="h-4 w-4 text-white" />}
            isPaused={currentTask.isPaused}
            onTogglePause={togglePauseTimer}
            onStop={stopTaskTimer}
          />
        </div>
      )}

      <Overlays />
      <ReactQueryDevtools />
    </>
  );
}

export default App;