import { useEffect, useState } from "react";
import { HeaderDatas, TableDatas } from "./faker";

export interface TableHeaderInterface {
  id: number;
  userId: string;
  config: TableHeaderConfigInterface[];
}

export interface TableHeaderConfigInterface {
  id: number;
  value: string;
  key: string;
}

export interface TablePropsInterface {
  userId: number;
  headerConfig: TableHeaderInterface[];
  datasConfig: [];
}

export interface TableDatasInterface {
  headers: TableHeaderInterface[];
  data: [];
}

export const BasicTable: React.FC<TablePropsInterface> = ({
  userId = 1,
  headerConfig,
  datasConfig,
}) => {
  const [datas, setDatas] = useState<any>([]);
  const [headers, setHeaders] = useState<any>(headerConfig);

  useEffect(() => {
    configHeader(headers, userId);
  }, []);

  function configHeader(headers: TableHeaderInterface[], userId: number) {
    const response:any = headers.find((el:any) => (el.userId = userId));
    configDatas(response?.config);
    setHeaders(response?.config);
  }

  function configDatas(headerData: TableHeaderConfigInterface[]) {
    const data = datasConfig.map((person: any) => {
      const result:any = {};
      headerData.forEach((header) => {
        const matchedItem = person.find((item:any) => item.key === header.key);
        if (matchedItem) {
          result[header.key] = matchedItem.value;
        }
      });
      const imageItem = person.find((item:any) => item.key === "image");
      if (imageItem) {
        result.image = imageItem.value;
      }
      return result;
    });

    setDatas(data);
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Table</h1>
            <p className="mt-2 text-sm text-gray-700">table example</p>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {headers &&
                      headers.map((header:any, index:number) => (
                        <th
                          key={index} // Utilisez _id ou index comme clé unique
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                        >
                          {header.value}
                        </th>
                      ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {datas.map((data: any, index: number) => (
                    <tr key={index}>
                      {"image" in data && "name" in data && (
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 shrink-0">
                              <img
                                alt=""
                                src={data.image}
                                className="h-full w-full rounded-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {data.name}
                              </div>
                              {"email" in data && (
                                <div className="mt-1 text-gray-500">
                                  {data.email}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      )}

                      {/* Rendu des autres clés dynamiquement */}
                      {Object.keys(data).map((key) => {
                        if (
                          key === "image" ||
                          key === "name" ||
                          key === "email"
                        )
                          return null;
                        return (
                          <td
                            key={key}
                            className="whitespace-nowrap px-3 py-5 text-sm text-gray-500"
                          >
                            {key === "status" ? (
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                {data[key]}
                              </span>
                            ) : (
                              data[key]
                            )}
                          </td>
                        );
                      })}

                      {/* Action Column */}
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {data.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const BasicTableShow: React.FC = () => {
  const userId = 1;
  const headers:any = HeaderDatas;
  const datas:any = TableDatas;

  return (
    <>
      <div className="my-6">
        <BasicTable
          userId={userId}
          headerConfig={headers}
          datasConfig={datas}
        />
      </div>
    </>
  );
};
