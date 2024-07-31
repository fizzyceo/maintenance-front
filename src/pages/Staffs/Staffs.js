import React, { useEffect } from "react";
import DataTableBase from "../../Components/Common/DataTableBase/DataTableBase";
import { t } from "i18next";
import { useStaffStore } from "../../stores/Staffs";

export const StaffsPage = () => {
  const title = "Staffs";
  // API Call
  const { getStaffs, isLoading, isError, staffs, deleteDevice } = useStaffStore(
    (state) => state
  );

  useEffect(() => {
    getStaffs();
  }, []);

  const columns = [
    {
      name: t("Id"),
      // width: "100px",
      selector: (row) => row.code,
      sortable: false,
      wrap: true,
    },
    {
      name: t("Name"),
      // width: "100px",
      selector: (row) => row.firstName,
      sortable: false,
      wrap: true,
      format: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: t("Email"),
      // width: "100px",
      selector: (row) => row.email,
      sortable: false,
      wrap: true,
    },
    {
      name: t("Roles"),
      // width: "100px",
      selector: (row) => row.roles,
      sortable: false,
      wrap: true,
      format: (row) => row.roles.join(",")?.toUpperCase(),
    },
    {
      name: t("About"),
      // width: "100px",
      selector: (row) => row.about,
      sortable: false,
      wrap: true,
    },
    {
      name: t("Status"),
      // width: "100px",
      selector: (row) => row.status,
      sortable: false,
      wrap: true,
    },
    {
      name: t("Permissions"),
      // width: "100px",
      selector: (row) => row.permissions,
      sortable: false,
      wrap: true,
      format: (row) => row.permissions.join(" , ")?.toUpperCase(),
    },
  ];

  return (
    <>
      <DataTableBase
        tableTitle={title}
        data={staffs}
        columns={columns}
        loading={isLoading}
        // paginationTotalRows={total}
        // onChangePage={onChangePage}
        // onChangeRowsPerPage={onChangeRowsPerPage}
        // onHeaderAddBtnClick={toggleCreateModal}
        onHeaderDeleteBtnClick={() => {
          alert("Soon");
        }}
        // onRowEditBtnClick={setToFalsePositive}
        onRowDeleteBtnClick={deleteDevice}
        // onSearchIconClick={searchHandler}
        actionColWidth="190px"
        // showSearch={true}
        // showSubHeader={true}
        // showActionButtons={true}
        showActionColumn={false}
      />
    </>
  );
};
