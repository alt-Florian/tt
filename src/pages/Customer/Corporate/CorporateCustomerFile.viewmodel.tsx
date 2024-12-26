import RefIdForm from "@components/forms/RefidForm";
import { BreadcrumbPage } from "@components/ui/Breadcrumbs";
import { Tab } from "@components/ui/Tabs";
import { CorporateCustomerProfileResponse } from "@interfaces/customer/CustomerResponses.interface";
import { customerService } from "@services/customer/Customer.service";
import { useModalBoxStore } from "@stores/modalbox.store";
import Globals from "@utils/Globals";
import { useState } from "react";

export function CorporateCustomerFileViewModel(id: string) {
  const { hideModalBox, showModalBox } = useModalBoxStore();
  // Contact details switch
  const [isContactDetailsLeft, setIsContactDetailsLeft] = useState(true);
  // Tabs handling
  const tabsData: Tab[] = [
    { name: "Profil client", path: `/customers/corporate/${id}/profile` },
    { name: "Entreprises", path: `/customers/corporate/${id}/enterprises` },
    { name: "Missions", path: `/customers/corporate/${id}/missions` },
  ];

  // Data fetching for Profile Tab
  const {
    data: dataProfile,
    isPending: isPendingProfile,
    isError: isErrorProfile,
  } = customerService.getCorporateCustomerProfile(id);

  function transformData(data: CorporateCustomerProfileResponse) {
    const { details, relations, patrimony, possessions } = data.datas;
    const { name, row_infos, customer, refType, refId } = details;

    const rSocial =
      Globals.rSocials.find((rsocial) => rsocial.value === row_infos.rSocial)
        ?.text || "";

    const pages: BreadcrumbPage[] = [
      { name: "Clients", href: "/customers", current: false },
      {
        name: `${rSocial} ${name}`,
        href: `/customers/corporate/${id}`,
        current: true,
      },
    ];

    return {
      pages,
      relations,
      patrimony,
      possessions,
      name,
      row_infos,
      customer,
      rSocial,
      refType,
      refId,
    };
  }

  const openRefIdForm = () => {
    showModalBox({
      content: <RefIdForm handleClose={hideModalBox} id={id} />,
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
    isContactDetailsLeft,
    setIsContactDetailsLeft,
    tabsData,
    handleBecomeCustomer,
    openRefIdForm,
    handleDeleteCustomer,
    handleDownloadCSV,
  };
}
