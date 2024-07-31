import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { CustomCard } from "../../Components/Common/CustomCard";
import ReactSelect from "react-select";
import styled from "styled-components";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { Button } from "reactstrap";
import {
  prepareSelectOptions,
  reactSelectStyling,
} from "../../Components/Common/Forms/FormikInputHelper";

const Section = ({
  setSelectedDeviceLabel,
  devicesOptions,
  setSelectedAxis,
  onFilterButtonClick,
  setSelectedDateRange,
  onCancelButtonClick,
  selectedDateRange,
}) => {
  const [showFilters, setShowFilters] = useState(true);
  const [filterValues, setFilterValues] = useState({});
  const [firstDate, setFirstDate] = useState(null);
  const axisOptions = [
    { label: "x Axis", value: "x" },
    { label: "y Axis", value: "y" },
    { label: "z Axis", value: "z" },
  ];

  const handleDateChange = (dates) => {
    const userOffset = new Date().getTimezoneOffset() * 60 * 1000; // Convert offset to milliseconds
    if (dates.length === 1) {
      let minDate = new Date(dates[0]);
      let maxDate = new Date(dates[0]);
      maxDate.setDate(maxDate.getDate() + 7);
      setFirstDate(minDate);
      setSelectedDateRange([
        moment(dates[0].getTime() - userOffset).format("YYYY-MM-DD HH:mm:ss"),
      ]);
    } else if (dates.length === 2) {
      setSelectedDateRange([
        moment(dates[0].getTime() - userOffset).format("YYYY-MM-DD HH:mm:ss"),
        moment(dates[1].getTime() - userOffset).format("YYYY-MM-DD HH:mm:ss"),
      ]);
      setFilterValues({
        ...filterValues,
        dateFrom: dates[0],
        dateTo: dates[1],
      });
    }
  };

  return (
    <CustomCard>
      <div className="d-flex justify-content-between">
        <h4 className="text-muted">{t("Filtres")}</h4>
        <button
          className="btn p-0 text-muted border-0"
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          {showFilters ? t("Masquer") : t("Afficher")}
        </button>
      </div>
      <hr className="m-0" />
      <div
        className="mt-3"
        style={{
          height: showFilters ? "auto" : 0,
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {showFilters && (
          <div className="d-flex flex-wrap gap-2">
            <StyledFilterWrapper>
              <div className="input-group">
                <Flatpickr
                  className="form-control border-0 dash-filter-picker shadow"
                  options={{
                    mode: "range",
                    dateFormat: "m/d h:m",
                    minDate: firstDate,
                    maxDate: firstDate
                      ? new Date(firstDate).setDate(firstDate.getDate() + 7)
                      : null,
                    enableTime: true,
                  }}
                  placeholder={t("Date")}
                  onClose={handleDateChange}
                />
                <div className="input-group-text bg-primary border-primary text-white ">
                  <i className="ri-calendar-2-line"></i>
                </div>
              </div>
            </StyledFilterWrapper>
            {/**SENSOR SELECTOR */}
            <div className="col-sm-auto">
              <div className="input-group">
                <StyledFilterWrapper>
                  <ReactSelect
                    {...reactSelectStyling}
                    options={devicesOptions}
                    isSearchable={true}
                    placeholder={t("All devices")}
                    isClearable={true}
                    name={"search"}
                    onChange={(option) => {
                      setSelectedDeviceLabel(option?.label);
                    }}
                  />
                </StyledFilterWrapper>
              </div>
            </div>
            <div className="col-sm-auto">
              <div className="input-group">
                <StyledFilterWrapper>
                  <ReactSelect
                    {...reactSelectStyling}
                    options={axisOptions}
                    isMulti={true}
                    isSearchable={true}
                    placeholder={t("axis")}
                    isClearable={true}
                    name={"search"}
                    defaultValue={axisOptions}
                    onChange={(option) => {
                      setSelectedAxis(option.map((opt) => opt.value));
                    }}
                  />
                </StyledFilterWrapper>
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button color="secondary" onClick={onFilterButtonClick}>
            {t("Filter")}
          </Button>
          <Button color="danger" onClick={onCancelButtonClick}>
            {t("Cancel")}
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};

export default Section;

const StyledFilterWrapper = styled.div`
  min-width: 200px;
  // flex: 1;
`;
