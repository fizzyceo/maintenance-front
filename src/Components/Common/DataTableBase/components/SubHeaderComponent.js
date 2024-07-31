import { t } from "i18next";
import React, { useState } from "react";
import { Input } from "reactstrap";

export default function SubHeaderComponent({
  onAddBtnClick,
  onDeleteBtnClick,
  showSearch = true,
  showActionButtons = true,
  selectedRowsInfo = {},
  onSearchInputChange,
  onSearchIconClick,
}) {
  const { allSelected, selectedCount, selectedRows } = selectedRowsInfo;
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-100  d-flex justify-content-between  align-items-center position-absolute start-0">
      {showActionButtons ? (
        <div className="d-flex align-items-stretch justify-content-center gap-1">
          <button className="btn btn-success" onClick={onAddBtnClick}>
            + {t('Add')}
          </button>
          <button
            disabled={!selectedCount > 0}
            className="btn btn-danger"
            onClick={() => {
              onDeleteBtnClick(selectedRows);
            }}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <form className="d-flex align-align-items-center gap-3">
        {selectedCount > 0 && <span>( {selectedCount} selected )</span>}
        {showSearch && (
          <div className="d-flex gap-2">
            <Input
              placeholder={t('Search')}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearchInputChange && onSearchInputChange(e.target.value);
              }}
              onBlur={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                onSearchInputChange && onSearchInputChange(value);
                if (value === "") {
                  onSearchIconClick && onSearchIconClick(value);
                  return;
                }
              }}
            />
            <button
              // hidden={!searchValue}
              className="btn btn-secondary"
              onClick={(e) => {
                // if (!searchValue) return;
                e.preventDefault();
                onSearchIconClick && onSearchIconClick(searchValue);
              }}
            >
              <i className="ri-search-line"></i>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
