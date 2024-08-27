import React, { useEffect, useState, useMemo } from "react";
import Section from "./Section";
import { useDevicesStore } from "../../stores/Devices";
import { useAxisHistoryStore } from "../../stores/AxisHistory";
import { FETCH_FOR_LAST_X_HOURS } from "../../common/config";
import { Card, CardBody, CardHeader } from "reactstrap";
import { DisplacementChart, SpeedChart, TempChart } from "./Charts";
import HistoryTable from "./HistoryTable";
import RmsChart from "./RmsChart";

const ReportsPage = () => {
  const [selectedDeviceLabel, setSelectedDeviceLabel] = useState("VB0001");
  const [selectedAxis, setSelectedAxis] = useState(["x", "y", "z"]);
  const [devicesOptions, setDevicesOptions] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [changeDisplayedAxis, setChangeDisplayedAxis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { historyForReports, getAxisHistoryForReports } = useAxisHistoryStore(
    (state) => state
  );
  const { devices, getDevices } = useDevicesStore((state) => state);

  useEffect(() => {
    const fetchDevicesAndHistory = async () => {
      await getDevices();
      const hoursAgo = Date.now() - FETCH_FOR_LAST_X_HOURS;
      setIsLoading(true);
      console.log(hoursAgo);

      await getAxisHistoryForReports({
        createdAt: { $gte: new Date(hoursAgo) },
      });
      setIsLoading(false);
    };

    fetchDevicesAndHistory();
  }, []);

  // useEffect(() => {
  //   if (selectedDateRange.length === 2) {
  //     const filter = {
  //       ts: {
  //         $gte: new Date(selectedDateRange[0]).getTime(),
  //         $lte: new Date(selectedDateRange[1]).getTime(),
  //       },
  //     };
  //     setIsLoading(true);
  //     getAxisHistoryForReports(filter).finally(() => setIsLoading(false));
  //   }
  // }, [selectedDateRange]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  useEffect(() => {
    console.log(historyForReports);

    if (selectedDeviceLabel) {
      let x = historyForReports.filter(
        (hist) => hist.deviceId === selectedDeviceLabel
      );
      setFilteredHistory(x);
    }
    setFilteredHistory(historyForReports);
  }, [selectedDeviceLabel, historyForReports]);

  useEffect(() => {
    if (devices.length > 0) {
      const sortedDevices = devices
        .reverse()
        .map((dev) => ({
          label: dev.deviceId,
          value: dev._id,
          status: dev.status,
        }))
        .reverse();
      setDevicesOptions(sortedDevices);
      setSelectedDeviceLabel(sortedDevices[0]?.label);
    }
  }, [devices]);
  const handleFilterButtonClick = () => {
    console.log(
      "Filter button clicked with date range:",
      selectedDateRange,
      "and device label:",
      selectedDeviceLabel
    );

    // Initialize the filter object
    let filter = {};

    // Add date range filter if provided
    if (selectedDateRange.length === 2) {
      filter.ts = {
        $gte: new Date(selectedDateRange[0]).getTime(),
        $lte: new Date(selectedDateRange[1]).getTime(),
      };
    } else {
      const hoursAgo = Date.now() - FETCH_FOR_LAST_X_HOURS;
      filter.createdAt = { $gte: new Date(hoursAgo) };
    }

    // Add device filter if a device label is selected
    if (selectedDeviceLabel) {
      filter.deviceId = { $in: [selectedDeviceLabel] };
    }

    // Perform any additional actions needed on filter button click
    // For example, you may want to refresh data based on selected filters
    setIsLoading(true);
    getAxisHistoryForReports(filter).finally(() => setIsLoading(false));
  };

  // Handler for Cancel button click
  const handleCancelButtonClick = () => {
    console.log("Cancel button clicked");
    // Reset state to initial values
    setSelectedDeviceLabel("");
    setSelectedAxis(["x", "y", "z"]);
    setSelectedDateRange([]);
    setIsLoading(true);
    getAxisHistoryForReports({
      createdAt: { $gte: Date.now() - FETCH_FOR_LAST_X_HOURS },
    }).finally(() => setIsLoading(false));
  };
  return (
    <div>
      <Section
        setSelectedDeviceLabel={setSelectedDeviceLabel}
        devicesOptions={devicesOptions}
        setSelectedAxis={setSelectedAxis}
        selectedAxis={selectedAxis}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        onFilterButtonClick={handleFilterButtonClick}
        onCancelButtonClick={handleCancelButtonClick}
      />
      <Card>
        <CardHeader>
          <h3>RMS CHART</h3>
        </CardHeader>
        <CardBody>
          <RmsChart
            isLoading={isLoading}
            history={filteredHistory}
            dataColors={
              '["--vz-secondary-rgb, 0.2","--vz-secondary", "--vz-danger-rgb, 0.2", "--vz-danger"]'
            }
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h3>SPEED CHART</h3>
        </CardHeader>
        <CardBody>
          <SpeedChart
            isLoading={isLoading}
            history={filteredHistory}
            changeDisplayedAxis={changeDisplayedAxis}
            setChangeDisplayedAxis={setChangeDisplayedAxis}
            selectedAxis={selectedAxis}
            dataColors={
              '["--vz-secondary-rgb, 0.2","--vz-secondary", "--vz-danger-rgb, 0.2", "--vz-danger"]'
            }
          />
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader>
          <h3>DISPLACEMENT CHART</h3>
        </CardHeader>
        <CardBody>
          <DisplacementChart
            isLoading={isLoading}
            history={filteredHistory}
            changeDisplayedAxis={changeDisplayedAxis}
            setChangeDisplayedAxis={setChangeDisplayedAxis}
            selectedAxis={selectedAxis}
            dataColors={
              '["--vz-secondary-rgb, 0.2","--vz-secondary", "--vz-danger-rgb, 0.2", "--vz-danger"]'
            }
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3>TEMP CHART</h3>
        </CardHeader>
        <CardBody>
          <TempChart
            isLoading={isLoading}
            history={filteredHistory}
            dataColors={
              '["--vz-secondary-rgb, 0.2","--vz-secondary", "--vz-danger-rgb, 0.2", "--vz-danger"]'
            }
          />
        </CardBody>
      </Card>
      <HistoryTable tableData={filteredHistory} selectedAxis={selectedAxis} />
    </div>
  );
};

export default ReportsPage;
