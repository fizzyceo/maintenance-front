import { t } from "i18next";
import React, { useState } from "react";
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minEndDate, setMinEndDate] = useState(null);
  const [maxEndDate, setMaxEndDate] = useState(null);
  const today = new Date();

  const handleStartDateChange = (date) => {
    const selectedStartDate = date[0];
    if (selectedStartDate > today) {
      // Prevent future dates
      return;
    }

    setStartDate(selectedStartDate);

    // Set the maximum date for the end date picker
    const maxPossibleEndDate = new Date(selectedStartDate);
    maxPossibleEndDate.setDate(maxPossibleEndDate.getDate() + 7);

    // Ensure the max end date does not exceed today
    const computedMaxEndDate =
      maxPossibleEndDate > today ? today : maxPossibleEndDate;
    setMaxEndDate(computedMaxEndDate);

    // Calculate min end date
    const computedMinEndDate = new Date(selectedStartDate);
    computedMinEndDate.setDate(computedMinEndDate.getDate() - 7);
    setMinEndDate(computedMinEndDate);

    setEndDate(null); // Reset endDate when startDate changes

    // Set the selected date range
    setSelectedDateRange([
      moment(selectedStartDate).format("YYYY-MM-DD HH:mm:ss"),
    ]);
  };

  const handleEndDateChange = (date) => {
    if (date.length === 1 && startDate) {
      const selectedEndDate = date[0];

      setEndDate(selectedEndDate);

      // Set the selected date range
      if (startDate > selectedEndDate) {
        setSelectedDateRange([
          moment(selectedEndDate).format("YYYY-MM-DD HH:mm:ss"),
          moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
        ]);
      } else {
        setSelectedDateRange([
          moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
          moment(selectedEndDate).format("YYYY-MM-DD HH:mm:ss"),
        ]);
      }
    }
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked with date range:", selectedDateRange);
    if (onFilterButtonClick) {
      onFilterButtonClick();
    }
  };

  const handleCancelClick = () => {
    console.log("Cancel button clicked");
    // Reset state to initial values
    setStartDate(null);
    setEndDate(null);
    setMinEndDate(null);
    setMaxEndDate(null);
    setSelectedDateRange([]);
    setSelectedDeviceLabel(null);
    setSelectedAxis([]);

    if (onCancelButtonClick) {
      onCancelButtonClick();
    }
  };

  const axisOptions = [
    { label: "x Axis", value: "x" },
    { label: "y Axis", value: "y" },
    { label: "z Axis", value: "z" },
  ];

  return (
    <CustomCard>
      <div className="d-flex justify-content-between">
        <h4 className="text-muted">{t("Filtres")}</h4>
        <button
          className="btn p-0 text-muted border-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? t("Masquer") : t("Afficher")}
        </button>
      </div>
      <hr className="m-0" />
      {showFilters && (
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
          <div className="d-flex flex-wrap gap-2">
            <StyledFilterWrapper>
              <div className="input-group">
                <Flatpickr
                  className="form-control border-0 dash-filter-picker shadow"
                  options={{
                    dateFormat: "d/m/Y H:i", // European format (DD/MM/YYYY HH:mm)
                    maxDate: today,
                    enableTime: true,
                    time_24hr: true, // 24-hour time format
                  }}
                  placeholder={t("Start Date")}
                  onChange={handleStartDateChange}
                />
                <div className="input-group-text bg-primary border-primary text-white">
                  <i className="ri-calendar-2-line"></i>
                </div>
              </div>
            </StyledFilterWrapper>
            {startDate && (
              <StyledFilterWrapper>
                <div className="input-group">
                  <Flatpickr
                    className="form-control border-0 dash-filter-picker shadow"
                    options={{
                      dateFormat: "d/m/Y H:i", // European format (DD/MM/YYYY HH:mm)
                      minDate: minEndDate,
                      maxDate: maxEndDate || today,
                      enableTime: true,
                      time_24hr: true, // 24-hour time format
                    }}
                    placeholder={t("End Date")}
                    onChange={handleEndDateChange}
                  />
                  <div className="input-group-text bg-primary border-primary text-white">
                    <i className="ri-calendar-2-line"></i>
                  </div>
                </div>
              </StyledFilterWrapper>
            )}
            {/** SENSOR SELECTOR */}
            <div className="col-sm-auto">
              <div className="input-group">
                <StyledFilterWrapper>
                  <ReactSelect
                    {...reactSelectStyling}
                    options={devicesOptions}
                    isSearchable={true}
                    placeholder={t("VIB0001")}
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
                    defaultValue={axisOptions} // Default to all axis options
                    onChange={(option) => {
                      setSelectedAxis(option.map((opt) => opt.value));
                    }}
                  />
                </StyledFilterWrapper>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <Button color="secondary" onClick={handleFilterClick}>
              {t("Filter")}
            </Button>
            <Button color="danger" onClick={handleCancelClick}>
              {t("Cancel")}
            </Button>
          </div>
        </div>
      )}
    </CustomCard>
  );
};

export default Section;

const StyledFilterWrapper = styled.div`
  min-width: 200px;
  // flex: 1;
`;
