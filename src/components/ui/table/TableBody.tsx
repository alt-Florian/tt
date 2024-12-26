import { Column } from './EnhancedTable';

interface TableBodyProps {
  data: any[];
  columns: Column[];
}

export const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};