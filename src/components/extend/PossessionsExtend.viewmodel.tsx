import { Possession } from "@interfaces/customer/Possessions.interface";
import { dialogService } from "@services/Dialog.service";
import { possessionService } from "@services/customer/Possession.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function PossessionsExtendViewModel(id: string) {
  const queryClient = useQueryClient();

  //Data fetching
  const { data, isPending, isError } =
    possessionService.getCustomerPossessions(id);

  let active = 0;
  let passive = 0;

  if (data?.datas.assets !== undefined) {
    active = data?.datas.assets
      .filter((asset) => asset.type === "1")
      .reduce((acc, el) => acc + el.value, 0);

    passive = data?.datas.assets
      .filter((asset) => asset.type === "2")
      .reduce((acc, el) => acc + el.value, 0);
  }

  // DialogBox and ModalBox handling
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);

  //Mutations functions
  const { mutate: mutateUpdate } = possessionService.updatePossession();
  const { mutate: mutateDelete } = possessionService.deletePossession();

  const updatePossession = (
    possessionId: string,
    possession: Partial<Possession>
  ) =>
    mutateUpdate(
      { customerId: id, possessionId, possession },
      {
        onSuccess: () => {
          showDialogBox({
            ...dialogService.successMessage(),
            onClick: () => {
              hideDialogBox();
            },
          });
          queryClient.invalidateQueries({
            queryKey: [`possession${id}`],
          });
          queryClient.invalidateQueries({
            queryKey: [`physicalCustomerProfile${id}`],
          });
          queryClient.invalidateQueries({
            queryKey: [`corporateCustomerProfile${id}`],
          });
        },
        onError: (error: any) => console.log(error),
      }
    );

  const deletePossession = (possessionId: string) =>
    mutateDelete(
      { customerId: id, possessionId },
      {
        onSuccess: () => {
          showDialogBox({
            ...dialogService.successMessage(),
            onClick: () => {
              hideDialogBox();
            },
          });
          queryClient.invalidateQueries({
            queryKey: [`possession${id}`],
          });
          queryClient.invalidateQueries({
            queryKey: [`physicalCustomerProfile${id}`],
          });
          queryClient.invalidateQueries({
            queryKey: [`corporateCustomerProfile${id}`],
          });
        },
        onError: (error: any) => console.log(error),
      }
    );

  return {
    isPending,
    isError,
    data,
    active,
    passive,
    isFormVisible,
    setIsFormVisible,
    isActive,
    setIsActive,
    updatePossession,
    deletePossession,
  };
}
