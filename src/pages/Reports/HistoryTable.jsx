import React, { useEffect, useState } from "react";
import { CardHeader, Col } from "reactstrap";
import DataTableBase from "../../Components/Common/DataTableBase/DataTableBase";
import moment from "moment";
import * as XLSX from "xlsx";

const HistoryTable = ({ tableData, selectedAxis }) => {
  const [tableDataPerPage, setTableDataPerPage] = useState([]);
  const [activeColumns, setActiveColumns] = useState([]);
  useEffect(() => {
    const startIndex = 0;
    const slicedData = tableData.slice(startIndex, startIndex + 10);
    setTableDataPerPage(slicedData);
  }, [tableData]);

  const onChangePage = (page) => {
    const startIndex = (page - 1) * 10;
    const slicedData = tableData.slice(startIndex, startIndex + 10);
    setTableDataPerPage(slicedData);
  };

  const handleExport = () => {
    // Define the column mapping
    const axisMapping = {
      x: ["Disp X", "Speed X", "Angle X"],
      y: ["Disp Y", "Speed Y", "Angle Y"],
      z: ["Disp Z", "Speed Z", "Angle Z"],
    };

    // Transform data to include only the necessary fields
    const exportData = tableData.map((row, index) => {
      const rowData = {
        "#": index + 1,
        Date: moment(row.createdAt).format("DD.MM hh:mm"),
        RMS: parseFloat(row.rms || 0).toFixed(1),
      };

      selectedAxis.forEach((axis) => {
        rowData[axisMapping[axis][0]] = parseFloat(
          row.vibration.displacement[axis]
        ).toFixed(1);
        rowData[axisMapping[axis][1]] = parseFloat(
          row.vibration.speed[axis]
        ).toFixed(1);
        rowData[axisMapping[axis][2]] = parseFloat(
          row.vibration.angle[axis]
        ).toFixed(1);
      });

      return rowData;
    });

    // Convert data to Excel format
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "historique");

    // Save the Excel file
    XLSX.writeFile(
      wb,
      `historique-${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}.xlsx`
    );
  };

  useEffect(() => {
    const columns = [
      {
        name: "#",
        width: "50px",
        selector: (row) => tableData.indexOf(row) + 1,
        sortable: false,
        wrap: true,
      },
      {
        name: "Date",
        width: "150px",
        selector: (row) => moment(row.createdAt).format("DD.MM hh:mm"),
        sortable: false,
        wrap: true,
      },
      {
        name: "RMS",
        width: "100px",
        selector: (row) => parseFloat(row.rms || 0).toFixed(1),
        sortable: false,
        wrap: true,
      },
      {
        name: "Temp",
        width: "100px",
        selector: (row) => parseFloat(row.vibration.temperature).toFixed(1),
        sortable: false,
        wrap: true,
      },
      ...selectedAxis.map((axis) => ({
        name: `Disp ${axis.toUpperCase()}`,
        selector: (row) =>
          parseFloat(row.vibration.displacement[axis]).toFixed(1),
        sortable: false,
        wrap: true,
      })),
      ...selectedAxis.map((axis) => ({
        name: `Speed ${axis.toUpperCase()}`,
        selector: (row) => parseFloat(row.vibration.speed[axis]).toFixed(1),
        sortable: false,
        wrap: true,
      })),
      ...selectedAxis.map((axis) => ({
        name: `Angle ${axis.toUpperCase()}`,
        selector: (row) => parseFloat(row.vibration.angle[axis]).toFixed(1),
        sortable: false,
        wrap: true,
      })),
    ];
    setActiveColumns(columns);
  }, [selectedAxis, tableData]);

  return (
    <Col xl={12}>
      {tableData ? (
        <DataTableBase
          data={tableDataPerPage}
          columns={activeColumns}
          paginationTotalRows={tableData.length}
          onChangePage={onChangePage}
          onHeaderDeleteBtnClick={() => {
            alert("Soon");
          }}
          actionColWidth="100px"
          showActionButtons={false}
          showActionColumn={false}
          showSelectBox={false}
        >
          <CardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Col>
              <h4 className="card-title mb-0">Tableau</h4>
            </Col>

            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "0px",
              }}
            >
              <button
                className=" btn btn-secondary waves-effect waves-light"
                onClick={() => {
                  handleExport();
                }}
              >
                {"Download"}
              </button>
            </Col>
          </CardHeader>
        </DataTableBase>
      ) : (
        <div>Loading...</div>
      )}
    </Col>
  );
};

export default HistoryTable;
