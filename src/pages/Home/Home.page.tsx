import {
  ContactFormShow,
  CustomerFormShow,
} from "@components/forms/CustomerForm";
import { BasicTableShow } from "@components/tables/examples/BasicTable";
import { BasicTableComponentShow } from "@components/tables/examples/BasicTable_v2";
import { BadgeShow } from "@components/ui/Badge";
import { BreadcrumbShow } from "@components/ui/Breadcrumbs";
import { ButtonShow } from "@components/ui/Button";
import { ButtonShowV2 } from "@components/ui/Button-v2";
import { CardTimerShow } from "@components/ui/CardTimer";
import { DrawerBoxShow } from "@components/ui/DrawerBox";
import EditableText from "@components/ui/EditableText";
import { MetaListShow } from "@components/ui/Meta";
import { ModalBoxShow } from "@components/ui/ModalBox";
import { AlertShow } from "@components/ui/Notification/Alert";
import { DialogBoxShow } from "@components/ui/Notification/DialogBox";
import { ProgressBarShow } from "@components/ui/ProgressBar";
import { StepsProgressShow } from "@components/ui/StepsProgress";
import { TabsShow } from "@components/ui/Tabs";
import { HomeViewModel } from "@pages/Home/Home.viewmodel";
import { useAuthStore } from "@stores/Auth.store";

export default function HomePage() {
  const { todos, isLoadingTodo, isErrorTodo, createTodo } = HomeViewModel();

  const { user } = useAuthStore();
  const firstname = user?.firstname || localStorage.getItem("firstname");
  const lastname = user?.lastname || localStorage.getItem("lastname");

  return (
    <>
      <div className="mb-4">HomePage</div>
      <br />
      <br />
      <CustomerFormShow />
      <ContactFormShow />
      <div>
        {" "}
        <a
          href="/customers/physical/639caf892175950a96d92d79"
          className="underline mr-4"
        >
          Test physical customer file
        </a>
        <a
          href="/customers/corporate/633711e94720051040f0855d"
          className="underline"
        >
          Test corporate customer file
        </a>
      </div>
      <div className="flex items-center">
        <p className="my-4 text-red-600 mr-4">
          {firstname && lastname
            ? `User connecté : ${firstname} ${lastname}`
            : "Pas de user connecté"}
        </p>
        {(!firstname || !lastname) && (
          <p>
            <a href="/signin" className="underline">
              Se connecter
            </a>
          </p>
        )}
      </div>
      <ButtonShow />
      <ButtonShowV2 />
      <TabsShow />
      <BadgeShow />
      <BreadcrumbShow />
      <StepsProgressShow />
      <ProgressBarShow />
      <CardTimerShow />
      <MetaListShow />
      <AlertShow />
      <DialogBoxShow />
      <ModalBoxShow />
      <DrawerBoxShow />
      <BasicTableShow />
      <BasicTableComponentShow />
      <br /> <br />
      {isLoadingTodo && <div>Chargement...</div>}
      {isErrorTodo && <div>Erreur...</div>}
      {JSON.stringify(todos)}
      <br /> <br />
      <button
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
        onClick={() =>
          createTodo({ id: 214, title: "Test", userId: 1, completed: false })
        }
      >
        Créer une Todo
      </button>
      <EditableText content="Change moi !" onUpdate={(text) => alert(text)} />
    </>
  );
}
