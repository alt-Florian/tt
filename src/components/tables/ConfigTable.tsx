import Pagination from "@components/ui/Pagination";
import { FilteredBankDetailData } from "@interfaces/config/BankDetails.interface";
import { FilteredBlockData } from "@interfaces/config/Block.interface";
import { FilteredCustomerConfigData } from "@interfaces/config/CustomerConfig.interface";
import { FilteredLetterTemplateData } from "@interfaces/config/LetterTemplate.interface";
import { FilteredNatureData } from "@interfaces/config/Nature.interface";
import { FilteredPriceData } from "@interfaces/config/Price.interface";
import { FilteredTaskData } from "@interfaces/config/Task.interface";
import Globals from "@utils/Globals";
import { useNavigate } from "react-router-dom";

interface ConfigTablePropsInterface {
  filteredDatas:
    | FilteredBankDetailData[]
    | FilteredLetterTemplateData[]
    | FilteredBlockData[]
    | FilteredNatureData[]
    | FilteredPriceData[]
    | FilteredCustomerConfigData[]
    | FilteredTaskData[];
  skip: number;
  count: number;
  take: number;
  scope: number;
}

export const ConfigTable: React.FC<ConfigTablePropsInterface> = ({
  filteredDatas,
  skip,
  count,
  take,
  scope,
}) => {
  const navigate = useNavigate();

  const config = Globals.configTypes.find((config) => config.scope === scope);
  const display = config?.display || [];
  const formPath = config?.formPath || "";
  const path = config?.path || "";

  const onPaginationChange = (newSkip: number) =>
    navigate(`${path}?skip=${newSkip}`);

  return (
    <div className="mt-8 flow-root text-sm">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
            <thead className=" bg-white">
              <tr>
                {display &&
                  display.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black`}
                    >
                      {Globals.displayTranslation.find(
                        (display) => display.eng === column
                      )?.fr || column}
                    </th>
                  ))}
                <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                ></th>
              </tr>
            </thead>
            <tbody className=" bg-white">
              {filteredDatas ? (
                filteredDatas?.map((data, index: number) => (
                  <tr key={index} className="even:bg-gray-50">
                    {Object.keys(data).map((key) => {
                      if (key !== "_id") {
                        console.log("data", data);
                        return (
                          <td
                            key={key}
                            className={`whitespace-normal pl-4 pr-3 py-5 text-sm text-black max-w-[200px] break-words overflow-hidden ${
                              key === "name" && "font-semibold"
                            }`}
                          >
                            {/* Differents displays for each sort of column */}
                            {Array.isArray(data[key]) ? (
                              <div className="flex flex-wrap gap-1">
                                {data[key].map((item, index) => (
                                  <span
                                    key={index}
                                    className="py-1 px-2 border border-black"
                                  >
                                    {item?.name}
                                  </span>
                                ))}
                              </div>
                            ) : key === "colorCode" ? (
                              <div
                                style={{ backgroundColor: data[key] }}
                                className="w-4 h-4 rounded-full ml-4 border border-gray-300"
                              ></div>
                            ) : scope === 6 && key === "type" ? (
                              <div className="max-w-fit py-1 px-2 border border-black">
                                {Globals.letterTemplateTypes.find(
                                  (type) => type.id === data[key]
                                )?.name || ""}
                              </div>
                            ) : scope === 9 && key === "type" ? (
                              <div className="max-w-fit py-1 px-2 border border-black">
                                {
                                  Globals.priceTypes.find(
                                    (type) => type.id === data[key]
                                  )?.name
                                }
                              </div>
                            ) : scope === 9 && key === "value" ? (
                              `${data[key]} ${
                                Globals.priceTypes.find(
                                  (type) => type.id === data["type"]
                                )?.unit
                              }`
                            ) : (
                              `${data[key]}${
                                key === "alertDelay" ? " jours" : ""
                              }`
                            )}
                          </td>
                        );
                      }
                    })}
                    <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() =>
                          navigate(`${formPath}/${data["_id"]}?skip=${skip}`)
                        }
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
                <td colSpan={display && display.length + 1}>
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
