import PhysicalPatrimonyExtend from "@components/extend/PhysicalPatrimonyExtend";
import PossessionsExtend from "@components/extend/PossessionsExtend";
import AddPossessionForm from "@components/forms/AddPossessionForm";
import PatrimonyPhysicalForm from "@components/forms/PatrimonyPhysicalForm";
import {
  BigExpert,
  PhysicalCustomerProfileResponse,
} from "@interfaces/customer/CustomerResponses.interface";
import { PhysicalCustomerUpdate } from "@interfaces/customer/PhysicalCustomer.interface";
import { customerService } from "@services/customer/Customer.service";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useModalBoxStore } from "@stores/modalbox.store";
import { useQueryClient } from "@tanstack/react-query";
import { generateText } from "@utils/generateText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PhysicalCustomerProfileViewModel(id: string) {
  const navigate = useNavigate();
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
  } = customerService.getPhysicalCustomerProfile(id);

  function transformData(data: PhysicalCustomerProfileResponse) {
    const { details, relations, patrimony, possessions } = data.datas;
    const { name, row_infos, email1, infos, refType, bigExpert, customer } =
      details;
    const text = generateText(name, row_infos);
    let age = 0;
    const getAge = (date: string | Date): number =>
      new Date().getFullYear() - new Date(date).getFullYear();
    if (row_infos.birthday) {
      age = getAge(row_infos.birthday);
    }
    return {
      text,
      age,
      getAge,
      relations,
      patrimony,
      possessions,
      name,
      row_infos,
      customer,
      email1,
      infos,
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
  } = customerService.updatePhysicalCustomer();
  const handleUpdate = (value: PhysicalCustomerUpdate) => {
    mutate(
      { id, body: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`physicalCustomerProfile${id}`],
          });
        },
        onError: () => {
          queryClient.invalidateQueries({
            queryKey: [`physicalCustomerProfile${id}`],
          });

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

  //Handle CopyToClipboard button
  const [copyStatus, setCopyStatus] = useState(false);
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(true); // Affiche le message de succès
      setTimeout(() => setCopyStatus(false), 1000); // Cache le message après 1 secondes
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  //Handle modals
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openPossessionsModal = () => {
    showModalBox({
      content: <PossessionsExtend handleClose={hideModalBox} id={id} />,
      handleCloseModal: hideModalBox,
    });
  };

  const openAddPossessionForm = () => {
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
      content: <PhysicalPatrimonyExtend id={id} />,
      handleCloseModal: hideModalBox,
    });
  };

  const openPatrimonyPhysicalForm = (patrimonyId?: string) => {
    showModalBox({
      content: (
        <PatrimonyPhysicalForm
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
            queryKey: [`physicalCustomerProfile${id}`],
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
    isContactDetailsLeft,
    setIsContactDetailsLeft,
    copyStatus,
    handleCopy,
    openPossessionsModal,
    openAddPossessionForm,
    openPatrimonyModal,
    toggleRelations,
    setToggleRelations,
    togglePatrimony,
    setTogglePatrimony,
    navigate,
    handleUpdate,
    isErrorUpdate,
    errorUpdate,
    resetUpdateErrors,
    openPatrimonyPhysicalForm,
    handleBigExpert,
  };
}
