import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import SubHeaderComponent from "./components/SubHeaderComponent";
import RowActionBtns from "./components/RowActionBtns";
// import NoDataAvailable from "./components/NoDataAvailable";
import "./datatables_base.scss";
import { Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import { t } from "i18next";

// createTheme creates a new theme named customTheme that overrides the build in dark theme
createTheme(
  "customTheme",
  {
    text: {
      primary: "var(--vz-body-color)",
      secondary: "var(--vz-body-color)",
    },
    background: {
      default: "transparent",
    },
    context: {
      background: "green",
      text: "var(--vz-body-color)",
    },
    divider: {
      default: "var(--vz-border-color)",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
    button: {
      default: "rgba(0,0,0,.54)",
      focus: "rgba(0,0,0,.12)",
      hover: "rgba(0,0,0,.12)",
      disabled: "rgba(0, 0, 0, .18)",
    },
    selected: {
      default: "var(--vz-light)",
      text: "var(--vz-body-color)",
    },
    highlightOnHover: {
      default: "var(--vz-light)",
      text: "var(--vz-body-color)",
    },
    striped: {
      default: "var(--vz-light)",
      text: "var(--vz-body-color)",
    },
  },
  "dark"
);

export default function DataTableBase({
  columns = [],
  data = [],
  tableTitle,
  onHeaderAddBtnClick,
  onHeaderDeleteBtnClick,
  onRowEditBtnClick,
  onRowDeleteBtnClick,
  onActivate,
  onSuspend,
  showSelectBox = true,
  showActionColumn = true,
  showActionButtons,
  showSearch,
  showSubHeader,
  loading,
  sortServer,
  paginationTotalRows,
  onChangeRowsPerPage,
  onChangePage,
  customActionBtns,
  actionColWidth,
  onSearchInputChange,
  onSearchIconClick,
  onCancelFilterBtnClick,
  onApplyFilterBtnClick,
  children,
}) {
  // Handle Columns
  const actionCol = {
    name: (
      <div>
        <span>{t("Actions")}</span>

        {onApplyFilterBtnClick && onCancelFilterBtnClick && (
          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-sm btn-success"
              onClick={onApplyFilterBtnClick}
              title="Search"
            >
              <i className="ri-search-line"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={onCancelFilterBtnClick}
              title="Cancel"
            >
              <i className="ri-close-line"></i>{" "}
            </button>
          </div>
        )}
      </div>
    ),
    width: actionColWidth || "100px",
    grow: true,
    // compact:true,
    // selector: (row) => row.id,
    sortable: false,
    cell: (row, index, column, id) => {
      return (
        <RowActionBtns
          row={row}
          onRowEditBtnClick={onRowEditBtnClick}
          onRowDeleteBtnClick={onRowDeleteBtnClick}
          onActivate={onActivate}
          onSuspend={onSuspend}
          customActionBtns={customActionBtns}
        />
      );
    },
  };

  // Show Action Column
  const colsAfterAction = showActionColumn ? [...columns, actionCol] : columns;
  // End Columns

  const translatedColumns = colsAfterAction.map((col) => {
    const newCol = { ...col };

    // Check in case it's pure string not ( React Component )
    if (typeof newCol.name === "string") {
      newCol.name = t(newCol.name);
    }
    newCol.centered = true; // Add this line to center align headers

    return newCol;
  });

  // Selection Part
  const [selectedRowsInfo, setSelectedRowsInfo] = useState({});
  const selectedRowsHandler = (info) => {
    // const { allSelected, selectedCount, selectedRows } = info;
    setSelectedRowsInfo(info);
  };
  return (
    <Card>
      {tableTitle && (
        <CardHeader>
          <h4 className="card-title mb-0 flex-grow-1">{tableTitle}</h4>
        </CardHeader>
      )}

      <CardBody>
        {children}
        <DataTable
          keyField="_id"
          tableTitle={tableTitle}
          columns={translatedColumns}
          data={data}
          selectableRows={showSelectBox}
          selectableRowsVisibleOnly
          selectableRowsHighlight
          onSelectedRowsChange={selectedRowsHandler}
          highlightOnHover
          responsive
          progressPending={loading}
          progressComponent={
            <div className="p-3">
              <Spinner className="">Loading...</Spinner>
            </div>
          }
          noDataComponent={
            <span className="my-3">{t("There are no records to display")}</span>
          }
          // actions={
          //   <h3>Meky</h3>
          // }
          // dense
          // customStyles={customStyles}
          // striped
          subHeaderComponent={
            <SubHeaderComponent
              showActionButtons={showActionButtons}
              showSearch={showSearch}
              selectedRowsInfo={selectedRowsInfo}
              onAddBtnClick={onHeaderAddBtnClick}
              onDeleteBtnClick={onHeaderDeleteBtnClick}
              onSearchInputChange={onSearchInputChange}
              onSearchIconClick={onSearchIconClick}
            />
          }
          subHeader={showSubHeader}
          subHeaderAlign="center"
          theme="customTheme"
          persistTableHead={true}
          // noDataComponent={<NoDataAvailable />}
          sortServer={sortServer}
          pagination
          // paginationComponentOptions={{

          // }}
          paginationServer
          paginationTotalRows={paginationTotalRows}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={onChangePage}
        />
      </CardBody>
    </Card>
  );
}
