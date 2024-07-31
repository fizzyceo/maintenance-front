import React from "react";
import { useConfirmDialogStore } from "../../../../stores/Modal/ConfirmDialogStore";

export default function RowActionBtns({
  row,
  onRowEditBtnClick,
  onRowDeleteBtnClick,
  onSuspend,
  onActivate,
  customActionBtns,
}) {
  const { showConfirm } = useConfirmDialogStore((state) => state);
  const editRow = () => {
    onRowEditBtnClick(row);
  };
  const deleteRow = () => {
    showConfirm(() => {
      onRowDeleteBtnClick(row._id);
    });
  };

  return (
    <div className="d-flex flex-wrap align-items-stretch justify-content-center gap-1">
      {onRowEditBtnClick && (
        <button
          className="btn btn-sm btn-warning"
          onClick={editRow}
          title="Edit"
        >
          <i className="ri-edit-2-line"></i>
        </button>
      )}

      {onRowDeleteBtnClick && (
        <button
          className="btn btn-sm btn-danger"
          onClick={deleteRow}
          title="Delete"
        >
          <i className="ri-delete-bin-line"></i>
        </button>
      )}
      {customActionBtns && customActionBtns(row)}
    </div>
  );
}
