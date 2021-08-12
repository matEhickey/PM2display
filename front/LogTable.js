import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { getLogs } from "./services/logs";

const LogTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(async () => {
    const data = await getLogs();
    console.warn(data);
    setLogs(data);
  }, []);

  const data = logs;
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "timestamp",
      },
      {
        Header: "Message",
        accessor: "message",
      },
      {
        Header: "Process",
        accessor: "process_id",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="col-span-12">
        <div className="overflow-auto lg:overflow-visible ">
          <table
            {...getTableProps()}
            className="table text-gray-400 border-separate space-y-6 text-sm"
          >
            <thead className="bg-gray-800 text-gray-500">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-3"
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr className="bg-gray-800">
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="p-3">
                          <div className="flex align-items-center">
                            <div className="ml-3">
                              <div className="">{cell.render("Cell")}</div>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { LogTable };
