import CorporatePatrimonyExtend from "@components/extend/CorporatePatrimonyExtend";
import PossessionsExtend from "@components/extend/PossessionsExtend";
import AddPossessionForm from "@components/forms/AddPossessionForm";
import { CorporateCustomerUpdate } from "@interfaces/customer/CorporateCustomer.interface";
import { CorporateCustomerProfileResponse } from "@interfaces/customer/CustomerResponses.interface";
import { customerService } from "@services/customer/Customer.service";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function CorporateCustomerProfileViewModel(id: string) {
  const queryClient = useQueryClient();
  //Toggles
  const [toggleRelations, setToggleRelations] = useState(false);
  const [togglePatrimony, setTogglePatrimony] = useState(false);
  // Data fetching for Profile Tab
  const {
    data: dataProfile,
    isPending: isPendingProfile,
    isError: isErrorProfile,
  } = customerService.getCorporateCustomerProfile(id);

  function transformData(data: CorporateCustomerProfileResponse) {
    const { details, relations, patrimony, possessions } = data.datas;
    const { name, row_infos, customer, email1, refType, bigExpert } = details;

    return {
      relations,
      patrimony,
      possessions,
      name,
      row_infos,
      customer,
      email1,
      refType,
      bigExpert,
    };
  }

  const { showDialogBox, hideDialogBox } = useDialogBoxStore();
  const { mutate } = customerService.updateCorporateCustomer();
  const handleUpdate = (value: CorporateCustomerUpdate) => {
    mutate(
      { id, body: value },
      {
        onSuccess: () => {
          showDialogBox({
            ...dialogService.successMessage(),
            onClick: () => {
              hideDialogBox();
            },
          });
          queryClient.invalidateQueries({
            queryKey: [`corporateCustomerProfile${id}`],
          });
        },
        onError: () => {
          showDialogBox({
            ...dialogService.errorMessage(),
            onClick: () => {
              hideDialogBox();
            },
          });
        },
      }
    );
  };

  //Handle modals
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openPossessionsModal = () => {
    showModalBox({
      content: <PossessionsExtend handleClose={hideModalBox} id={id} />,
      handleCloseModal: hideModalBox,
    });
  };

  const openAddActiveForm = () => {
    showModalBox({
      content: (
        <AddPossessionForm
          customerId={id}
          isActive
          handleClose={() => {
            hideModalBox();
            openPossessionsModal();
          }}
        />
      ),
      handleCloseModal: () => {
        hideModalBox();
        openPossessionsModal();
      },
    });
  };

  const openPatrimonyModal = () => {
    showModalBox({
      content: <CorporatePatrimonyExtend id={id} />,
      handleCloseModal: hideModalBox,
    });
  };

  return {
    dataProfile,
    isPendingProfile,
    isErrorProfile,
    transformData,
    openPossessionsModal,
    openAddActiveForm,
    openPatrimonyModal,
    toggleRelations,
    setToggleRelations,
    togglePatrimony,
    setTogglePatrimony,
    handleUpdate,
  };
}
