import { HeaderSimpleDatas, TableSimpleDatas } from "./faker";

export interface TablePropsInterface {
  headers : string[], 
  datas: [{}]
}


export const BasicTableComponent: React.FC<TablePropsInterface> = ({
  headers,
  datas
}) => {

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Table</h1>
            <p className="mt-2 text-sm text-gray-700">table example with no userid implementation</p>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {headers &&
                      headers.map((header, index) => (
                        <th
                          key={index} 
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                        >
                          {header}
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
                              // set status style "
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                {data[key]}
                              </span>
                            ) : (
                              data[key]
                            )}
                          </td>
                        );
                      })}

 
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

export const BasicTableComponentShow: React.FC = () => {
  const headers:any = HeaderSimpleDatas;
  const datas:any = TableSimpleDatas;

  return (
    <>
      <div className="my-6">
        <BasicTableComponent
          headers={headers}
          datas={datas}
        />
      </div>
    </>
  );
};
