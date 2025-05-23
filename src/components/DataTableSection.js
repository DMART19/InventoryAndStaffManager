import React from "react";
import DataTable from "./DataTable";

const DataTableSection = ({ id, columns, tableData, onUpdateRow, onDeleteRow }) => { // Add id prop
  return (
    <div id={id} className="data-table-section"> {/* Add id prop here */}
      <h1 className="dashboard-title">Recent Activity Feed</h1>
      <DataTable
        columns={columns}
        data={tableData}
        onUpdateRow={onUpdateRow}
        onDeleteRow={onDeleteRow}
      />
    </div>
  );
};

export default DataTableSection;