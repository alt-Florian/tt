import { tableHelper } from '@utils/table';
import { Column } from './EnhancedTable';
import Pagination from "@components/ui/Pagination";
import { ProgressColumn } from './ColumnManager/ProgressColumn';
import { useNavigate } from 'react-router-dom';

interface TableBodyProps {
  data: any[] ;
  columns: Column[];
  onPaginationChange: (skip: number) => void;
  skip: number;
  count: number;
  take: number;
  transformer: typeof tableHelper;
  path: string;
}

export const TableBody: React.FC<TableBodyProps> = ({ data, columns, onPaginationChange, skip, count, take,transformer, path }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {column.label}
              </th>
            ))}
              <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                ></th>  
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                  const cellValue = transformer.format(column.id, row[column.id]);
                 
  
                if (typeof cellValue === 'object' && cellValue?.type === 'progress') {
                  
                      return (cellValue.value < 100? 
                        <td key={column.id} className="px-3 py-4 text-sm">
                          <ProgressColumn value={cellValue.value} />
                        </td> :
                        <td key={column.id} className="px-3 py-4 text-sm">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Finalisée        
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td key={column.id} className="px-3 py-4 text-sm">
                        {cellValue}
                      </td>
                    );
              })}
                  <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() =>
                          navigate(`${path}/${row?._id}`)
                        }
                        className="text-indigo-600 font-semibold hover:text-indigo-800 pr-4"
                      >
                        Modifier
                      </button>
                    </td>
            </tr>
            
          ))}
          <tr>
            
                <td >
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
  );
};