import React from "react";
import { Input } from "reactstrap";
import "flatpickr/dist/themes/material_green.css";

export const TableColumnHeaderFilter = ({
  name,
  colName,
  filterType,
  selectOptions,
  inputClassName,
  wrapperClassName,
  dateFromName = "dateFrom",
  dateToName = "dateTo",
  ...rest
}) => {
  const wrapperClass = `d-flex flex-column  py-2 w-100 ${wrapperClassName}`;

  switch (filterType) {
    case "select":
      return (
        // <div className="d-flex flex-column py-2 align-items-center justify-content-between  w-100 gap-2 flex-md-nowrap flex-wrap">
        <div className={` ${wrapperClass}`}>
          <label htmlFor={name}>{colName}</label>
          <Input
            id={name}
            name={name}
            // placeholder={name}
            className={`${inputClassName}`}
            type="select"
            {...rest}
          >
            {selectOptions &&
              selectOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  selected={option.selected ? true : false}
                  // defaultValue={'true'}
                >
                  {option.displayText}
                </option>
              ))}
          </Input>
        </div>
      );
    case "date":
      return (
        // <div className="d-flex flex-column py-2 align-items-center justify-content-between  w-100 gap-2 flex-md-nowrap flex-wrap">
        <div className={` ${wrapperClass}`}>
          <label htmlFor={name}>{colName}</label>
          <Input
            id={dateFromName}
            name={dateFromName}
            // placeholder={name}
            className={`${inputClassName}`}
            type="date"
            {...rest}
          />

          <Input
            id={dateToName}
            name={dateToName}
            // placeholder={name}
            className={`mt-2 ${inputClassName}`}
            type="date"
            {...rest}
          />
        </div>
      );

    default:
      return (
        <div className={` ${wrapperClass}`}>
          <label htmlFor={name}>{colName}</label>
          <Input
            id={name}
            name={name}
            // placeholder={name}
            className={`${inputClassName}`}
            {...rest}
          />
        </div>
      );
  }
};
