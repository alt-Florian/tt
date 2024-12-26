import UserForm from "@components/forms/UserForm";
import { Badge } from "@components/ui/Badge";
import Pagination from "@components/ui/Pagination";
import { UserData } from "@interfaces/user/User.interface";
import { useModalBoxStore } from "@stores/modalbox.store";
import { useUsersListStore } from "@stores/UsersList.store";
import Globals from "@utils/Globals";

interface UsersTablePropsInterface {
  columns: string[];
  datas: UserData[];
  count: number;
  take: number;
}

export const UsersTable: React.FC<UsersTablePropsInterface> = ({
  columns,
  datas,
  count,
  take,
}) => {
  const { skip, setSkip } = useUsersListStore();
  const onPaginationChange = (skip: number) => setSkip(skip);

  // Handling modal form
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openModalBox = (id?: number) => {
    showModalBox({
      content: <UserForm handleClose={hideModalBox} id={id} />,
      handleCloseModal: hideModalBox,
    });
  };

  return (
    <div className="mt-8 flow-root text-sm">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
            <thead className=" bg-white">
              <tr>
                {columns &&
                  columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black`}
                    >
                      {column}
                    </th>
                  ))}
                <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                ></th>
              </tr>
            </thead>
            <tbody className=" bg-white">
              {datas ? (
                datas?.map((data, index: number) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="pl-3 pr-4 font-semibold">{data.id}</td>
                    <td className="pl-3 pr-4 font-semibold">
                      {data.firstname} {data.lastname}
                    </td>
                    <td className="pl-3 pr-4">{data.email}</td>
                    <td className="pl-3 pr-4">
                      {
                        Globals.roles.find((role) => role.id === data.role)
                          ?.name
                      }
                    </td>
                    <td className="pl-3 pr-4">
                      <div>
                        {data.isActive ? (
                          <Badge
                            text={"Actif"}
                            bgColor="bg-green-50"
                            textColor="text-green-700"
                            ringColor="ring-green-600/20"
                          />
                        ) : (
                          <Badge
                            text={"Inactif"}
                            bgColor="bg-red-50"
                            textColor="text-red-700"
                            ringColor="ring-red-600/20"
                          />
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => openModalBox(data.id)}
                        className="text-indigo-600 font-semibold hover:text-indigo-800 pr-4"
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>Aucun élément à afficher</p>
              )}
              <tr>
                <td colSpan={columns && columns.length + 1}>
                  <Pagination
                    count={count}
                    skip={skip}
                    take={take}
                    onPaginationChange={onPaginationChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
