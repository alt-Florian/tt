import UserForm from "@components/forms/UserForm";
import { userService } from "@services/User.service";
import { useModalBoxStore } from "@stores/modalbox.store";
import { useUsersListStore } from "@stores/UsersList.store";

export function UsersListViewModel() {
  const columns: string[] = ["#", "Identité", "Email", "Rôle", "Status"];
  const display: string[] = [
    "id",
    "firstname",
    "lastname",
    "email",
    "role",
    "isActive",
  ];
  const { skip } = useUsersListStore();

  // Get users datas :
  const { data, isPending, isError } = userService.getAllUsers(skip, display);

  // Handling modal form
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openModalBox = () => {
    showModalBox({
      content: <UserForm handleClose={hideModalBox} />,
      handleCloseModal: hideModalBox,
    });
  };

  return {
    columns,
    data,
    isPending,
    isError,
    openModalBox,
  };
}
