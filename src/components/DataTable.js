import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Chip,
} from "@mui/material";
import { Edit, Delete, FilterList, Info } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";
import "./DataTable.css";

const DataTable = ({ id, columns, data, onUpdateRow, onDeleteRow, tooltipsEnabled = true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => {
      acc[col.accessor] = true;
      return acc;
    }, {})
  );
  const [filters, setFilters] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  // Enhanced status display
  const renderStatusCell = (value) => {
    const statusColors = {
      Completed: { bg: '#e8f5e9', text: '#2e7d32' },
      Pending: { bg: '#fff3e0', text: '#ff8f00' },
      Scheduled: { bg: '#e3f2fd', text: '#1565c0' },
      Cancelled: { bg: '#ffebee', text: '#c62828' },
    };

    const statusStyle = statusColors[value] || { bg: '#f5f5f5', text: '#616161' };

    return (
      <Chip
        label={value}
        style={{
          backgroundColor: statusStyle.bg,
          color: statusStyle.text,
          fontWeight: 500,
          minWidth: 80,
        }}
        size="small"
      />
    );
  };

  const enhancedColumns = columns.map(col => {
    if (col.accessor === 'status') {
      return {
        ...col,
        Cell: ({ value }) => renderStatusCell(value)
      };
    }
    return col;
  });

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const exportToCSV = () => {
    const filteredData = data.filter((row) => {
      const matchesSearchTerm = enhancedColumns.some((col) =>
        row[col.accessor]?.toString().toLowerCase().includes(searchTerm)
      );

      const matchesFilters = Object.keys(filters).every(
        (key) => row[key]?.toString().toLowerCase().includes(filters[key]?.toLowerCase())
      );

      return matchesSearchTerm && matchesFilters;
    });

    const paginatedData = filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const headers = enhancedColumns
      .filter((col) => visibleColumns[col.accessor])
      .map((col) => col.Header)
      .join(",");

    const rows = paginatedData
      .map((row) =>
        enhancedColumns
          .filter((col) => visibleColumns[col.accessor])
          .map((col) => row[col.accessor] || "")
          .join(",")
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const handleFilterOpen = () => setOpenFilterDialog(true);
  const handleFilterClose = () => setOpenFilterDialog(false);

  const handleColumnVisibilityChange = (e, column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column.accessor]: e.target.checked,
    }));
  };

  const handleSelectRow = (event, rowId) => {
    event.stopPropagation();
    const selectedIndex = selectedRows.indexOf(rowId);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, rowId);
    } else {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const filteredData = data.filter((row) => {
    const matchesSearchTerm = enhancedColumns.some((col) =>
      row[col.accessor]?.toString().toLowerCase().includes(searchTerm)
    );

    const matchesFilters = Object.keys(filters).every(
      (key) => row[key]?.toString().toLowerCase().includes(filters[key]?.toLowerCase())
    );

    return matchesSearchTerm && matchesFilters;
  });

  const currentPageData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (row) => {
    onUpdateRow(row);
  };

  return (
    <div id={id} className="dashboard-data-table">
      <Tooltip
        id="data-table-tooltip"
        className="custom-tooltip"
        place="top"
        effect="solid"
        delayShow={300}
        border="1px solid rgba(255, 255, 255, 0.1)"
        isOpen={tooltipsEnabled ? undefined : false}
      />

      <div className="table-header">
        <div className="search-container">
          <TextField
            id="search-bar"
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
            data-tooltip-id="data-table-tooltip"
            data-tooltip-content="Search across all visible columns"
            data-tooltip-enabled={tooltipsEnabled}
          />
          <Info
            className="tooltip-icon"
            data-tooltip-id="data-table-tooltip"
            data-tooltip-content="Search supports partial matches and is case insensitive"
            data-tooltip-enabled={tooltipsEnabled}
          />
        </div>

        <div className="table-actions">
          <IconButton
            id="filter-button"
            onClick={handleFilterOpen}
            data-tooltip-id="data-table-tooltip"
            data-tooltip-content="Show/hide columns and filter options"
            data-tooltip-enabled={tooltipsEnabled}
          >
            <FilterList />
          </IconButton>

          <Button
            id="export-button"
            variant="contained"
            color="primary"
            onClick={exportToCSV}
            data-tooltip-id="data-table-tooltip"
            data-tooltip-content="Export visible data to CSV file"
            data-tooltip-enabled={tooltipsEnabled}
          >
            Export to CSV
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                  checked={selectedRows.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {enhancedColumns
                .filter((col) => visibleColumns[col.accessor])
                .map((col) => (
                  <TableCell key={col.accessor}>
                    {col.Header}
                  </TableCell>
                ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => {
              const isRowSelected = isSelected(row.id);
              return (
                <TableRow
                  id={`table-row-${index}`}
                  key={row.id}
                  hover
                  selected={isRowSelected}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRowSelected}
                      onChange={(e) => handleSelectRow(e, row.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  {enhancedColumns
                    .filter((col) => visibleColumns[col.accessor])
                    .map((col) => (
                      <TableCell key={col.accessor}>
                        {col.Cell ? col.Cell({ value: row[col.accessor] }) : row[col.accessor]}
                      </TableCell>
                    ))}
                  <TableCell>
                    <IconButton
                      id={`edit-button-${index}`}
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(row);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      id={`delete-button-${index}`}
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRows([row.id]);
                        onDeleteRow(row.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Dialog open={openFilterDialog} onClose={handleFilterClose}>
        <DialogTitle>
          <div className="dialog-title">
            Filter Options
            <Info
              className="tooltip-icon"
              data-tooltip-id="data-table-tooltip"
              data-tooltip-content="Toggle column visibility and apply filters"
              data-tooltip-enabled={tooltipsEnabled}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          {enhancedColumns.map((col) => (
            <div key={col.accessor} className="filter-option">
              <Checkbox
                checked={visibleColumns[col.accessor]}
                onChange={(e) => handleColumnVisibilityChange(e, col)}
                data-tooltip-id="data-table-tooltip"
                data-tooltip-content={`Toggle ${col.Header} column visibility`}
                data-tooltip-enabled={tooltipsEnabled}
              />
              <span>{col.Header}</span>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleFilterClose}
            color="primary"
            data-tooltip-id="data-table-tooltip"
            data-tooltip-content="Discard changes and close"
            data-tooltip-enabled={tooltipsEnabled}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFilterClose}
            color="secondary"
            data-tooltip-id="data-table-tooltip"
            data-tooltip-content="Apply changes and close"
            data-tooltip-enabled={tooltipsEnabled}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(selectedRow)} onClose={() => setSelectedRow(null)}>
        <DialogTitle>Full Information</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div className="row-details">
              {enhancedColumns.map((col) => (
                <div key={col.accessor} className="detail-row">
                  <strong>{col.Header}:</strong> {selectedRow[col.accessor]}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSelectedRow(null)}
            color="primary"
            data-tooltip-id="data-table-tooltip"
            data-tooltip-content="Close this dialog"
            data-tooltip-enabled={tooltipsEnabled}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DataTable.propTypes = {
  id: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      description: PropTypes.string,
      Cell: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  tooltipsEnabled: PropTypes.bool,
};

export default DataTable;