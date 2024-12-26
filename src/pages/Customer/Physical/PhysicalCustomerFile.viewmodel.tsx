import EmailForm from "@components/forms/EmailForm";
import { BreadcrumbPage } from "@components/ui/Breadcrumbs";
import { Tab } from "@components/ui/Tabs";
import { PhysicalCustomerProfileResponse } from "@interfaces/customer/CustomerResponses.interface";
import { customerService } from "@services/customer/Customer.service";
import { useModalBoxStore } from "@stores/modalbox.store";
import Globals from "@utils/Globals";
import { useEffect, useRef, useState } from "react";

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

  //Delete Mutation & function
  const handleDeleteCustomer = () => console.log("delete");

  //Download CSV function
  const handleDownloadCSV = () => {
    console.log("download");
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
