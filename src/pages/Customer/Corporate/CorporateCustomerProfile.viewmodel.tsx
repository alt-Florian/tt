import CorporatePatrimonyExtend from "@components/extend/CorporatePatrimonyExtend";
import PossessionsExtend from "@components/extend/PossessionsExtend";
import AddPossessionForm from "@components/forms/AddPossessionForm";
import PatrimonyCorporateForm from "@components/forms/PatrimonyCorporateForm";
import { CorporateCustomerUpdate } from "@interfaces/customer/CorporateCustomer.interface";
import {
  BigExpert,
  CorporateCustomerProfileResponse,
} from "@interfaces/customer/CustomerResponses.interface";
import { customerService } from "@services/customer/Customer.service";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function CorporateCustomerProfileViewModel(id: string) {
  const queryClient = useQueryClient();
  // Contact details switch
  const [isContactDetailsLeft, setIsContactDetailsLeft] = useState(true);
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
  const {
    mutate,
    isError: isErrorUpdate,
    error: errorUpdate,
    reset: resetUpdateErrors,
  } = customerService.updateCorporateCustomer();
  const handleUpdate = (value: CorporateCustomerUpdate) => {
    mutate(
      { id, body: value },
      {
        onSuccess: () => {
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

  const openPatrimonyCorporateForm = (patrimonyId?: string) => {
    showModalBox({
      content: (
        <PatrimonyCorporateForm
          handleClose={hideModalBox}
          id={id}
          patrimonyId={patrimonyId}
        />
      ),
      handleCloseModal: hideModalBox,
    });
  };

  const { mutate: mutateBigExpert } = customerService.bigExpert();
  const handleBigExpert = (value: BigExpert) => {
    mutateBigExpert(
      { id, body: value },
      {
        onSuccess: () => {
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
    isContactDetailsLeft,
    setIsContactDetailsLeft,
    handleUpdate,
    isErrorUpdate,
    errorUpdate,
    resetUpdateErrors,
    handleBigExpert,
    openPatrimonyCorporateForm,
  };
}
