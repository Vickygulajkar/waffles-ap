import React from 'react';

export interface Column<T> {
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  selectable?: boolean;
  rowClassName?: (item: T) => string;
  minWidth?: string;
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  selectable = false,
  rowClassName,
  minWidth = '800px'
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full text-left border-collapse" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-gray-100">
            {selectable && (
              <th className="py-3 px-4 w-12">
                <input type="checkbox" className="rounded border-gray-300 text-[#E85D21] focus:ring-[#E85D21]" />
              </th>
            )}
            {columns.map((col, index) => (
              <th 
                key={index} 
                className={`py-3 px-4 text-xs font-bold text-gray-800 ${col.headerClassName || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            const extraRowClass = rowClassName ? rowClassName(item) : '';
            return (
              <tr 
                key={keyExtractor(item)} 
                className={`border-b border-gray-50 transition-colors hover:bg-orange-50/30 ${extraRowClass}`}
              >
                {selectable && (
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded border-gray-300 text-[#E85D21] focus:ring-[#E85D21]" />
                  </td>
                )}
                {columns.map((col, index) => {
                  let content: React.ReactNode = null;
                  if (col.cell) {
                    content = col.cell(item, rowIndex);
                  } else if (col.accessorKey) {
                    content = item[col.accessorKey] as React.ReactNode;
                  }

                  return (
                    <td 
                      key={index} 
                      className={`py-3 px-4 ${col.cellClassName || ''}`}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
