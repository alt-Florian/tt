import EmailForm from "@components/forms/EmailForm";
import { BreadcrumbPage } from "@components/ui/Breadcrumbs";
import { Tab } from "@components/ui/Tabs";
import { PhysicalCustomerProfileResponse } from "@interfaces/customer/CustomerResponses.interface";
import { customerService } from "@services/customer/Customer.service";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import Globals from "@utils/Globals";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PhysicalCustomerFileViewModel(id: string) {
  const { hideModalBox, showModalBox } = useModalBoxStore();

  //Handle EllispisModal
  const ellipsisModalRef = useRef<HTMLDivElement>(null);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
  //Close ellipsis modal on click outside the box
  const handleClickOutside = (event: MouseEvent) => {
    if (
      event.target instanceof Node &&
      ellipsisModalRef.current &&
      !ellipsisModalRef.current.contains(event.target)
    ) {
      setIsEllipsisOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Nettoie l'écouteur lors du démontage du composant
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Tabs handling
  const tabsData: Tab[] = [
    { name: "Profil client", path: `/customers/physical/${id}/profile` },
    { name: "Entreprises", path: `/customers/physical/${id}/enterprises` },
    { name: "Missions", path: `/customers/physical/${id}/missions` },
  ];
  // Data fetching for Profile Tab
  const {
    data: dataProfile,
    isPending: isPendingProfile,
    isError: isErrorProfile,
  } = customerService.getPhysicalCustomerProfile(id);

  function transformData(data: PhysicalCustomerProfileResponse) {
    const { name, row_infos, customer, refType, email1 } = data.datas.details;
    const civility =
      Globals.civilities.find(
        (civility) => civility.value === row_infos.civilities
      )?.short || "X.";
    const pages: BreadcrumbPage[] = [
      { name: "Clients", href: "/customers", current: false },
      {
        name: `${civility} ${row_infos.firstname ?? "Xxxxxx"} ${name}`,
        href: `/customers/${customer}`,
        current: true,
      },
    ];
    return {
      civility,
      pages,
      name,
      row_infos,
      customer,
      refType,
      email1,
    };
  }

  const openUpdateCustomerForm = () => {
    showModalBox({
      content: <EmailForm handleClose={hideModalBox} id={id} />,
      handleCloseModal: hideModalBox,
    });
  };
  //Become Customer Mutation & function
  const { mutate: mutateBecomeCustomer } = customerService.becomeCustomer();
  const handleBecomeCustomer = () => {
    mutateBecomeCustomer({ id, body: {} });
  };

  const navigate = useNavigate();
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();
  //Delete Mutation & function
  const { mutate: mutateDelete } = customerService.deletePhysicalCustomer();
  const handleDeleteCustomer = (id: string) => {
    mutateDelete(id, {
      onSuccess: () => {
        showDialogBox({
          ...dialogService.successMessage(),
          onClick: () => {
            hideDialogBox();
          },
        });
        navigate("/");
      },
      onError: () => {
        showDialogBox({
          ...dialogService.errorMessage(),
          onClick: () => {
            hideDialogBox();
          },
        });
        navigate("/");
      },
    });
  };

  //Download CSV function
  const handleDownloadCSV = () => {
    // const data = await fetch(
    //   "https://test-actioneo-gateway.alt-tech.bzh/api/crm/customer/csv/632d571d4720051040f0614c",
    //   {
    //     method: "Get",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Version: "2",
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZWMxZmYzZmMyN2E0NDcyMDliNTk2YiIsImVtYWlsIjoibWFzdGVyQGFsdC5iemgiLCJmaXJzdG5hbWUiOiJtYXN0ZXIiLCJsYXN0bmFtZSI6Im1pbmQiLCJpc0FjdGl2ZSI6dHJ1ZSwicm9sZSI6MSwiaWQiOjgsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMjVUMTQ6MzE6MjEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTItMjJUMTY6MzQ6NTAuMjk2WiJ9LCJpYXQiOjE3MzQ4ODk1NDAsImV4cCI6MTczNDk3NTk0MCwiYXVkIjoibG9jYWxob3N0IiwiaXNzIjoibG9jYWxob3N0In0.xFVsQxhIet-b9ciKOhbV6eJA87VfzdraTw9X0tlPKuo",
    //     },
    //   }
    // );
    // console.log("🚀 ~ handleDownloadCSV ~ data:", data);
  };

  return {
    dataProfile,
    isPendingProfile,
    isErrorProfile,
    transformData,
    tabsData,
    isEllipsisOpen,
    setIsEllipsisOpen,
    ellipsisModalRef,
    handleBecomeCustomer,
    openUpdateCustomerForm,
    handleDeleteCustomer,
    handleDownloadCSV,
  };
}
