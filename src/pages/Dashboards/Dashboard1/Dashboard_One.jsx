import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { t } from "i18next";
import Section from "./Section";

import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";

import "./extra.scss";
import { useDatePickerStore } from "../../../stores/datePickerStore";

import {
  ChartSyncingArea,
  ChartSyncingArea2,
  ChartSyncingArea3,
  ChartSyncingLine,
  ChartSyncingLine2,
} from "./Charts/Echarts";
import CountUp from "react-countup";
import FeatherIcon from "feather-icons-react";
import { useDevicesStore } from "../../../stores/Devices";
import { useAxisHistoryStore } from "../../../stores/AxisHistory";
import Loader from "../../../Components/Common/Loader";

// const SimpleDonut = ({ dataColors }) => {

//   return (

//   );
// };
import x_danger from "../../../assets/icons/x_danger.png";
import x_warning from "../../../assets/icons/x_warning.png";
import x_success from "../../../assets/icons/x_success.png";
import y_danger from "../../../assets/icons/y_danger.png";
import y_warning from "../../../assets/icons/y_warning.png";
import y_success from "../../../assets/icons/y_success.png";
import z_danger from "../../../assets/icons/z_danger.png";
import z_warning from "../../../assets/icons/z_warning.png";
import z_success from "../../../assets/icons/z_success.png";
import {
  DISPLACEMENT_DANGER_THRESHOLD,
  DISPLACEMENT_WARNING_THRESHOLD,
  FETCH_FOR_LAST_X_HOURS,
  TEMPERATURE_DANGER_THRESHOLD,
  TEMPERATURE_WARNING_THRESHOLD,
} from "../../../common/config";
import TempChart from "./Charts/Charts";

export default function DashboardOne() {
  const title = t(" Dashboard");

  const [chartsReady, setChartsReady] = useState(true);
  const [selectedDeviceTemp, setSelectedDeviceTemp] = useState(24.5);
  const [selectedDeviceLabel, setSelectedDeviceLabel] = useState("VB0001");
  const [devicesOptions, setDevicesOptions] = useState([]);
  var chartDonutBasicColors = getChartColorsArray(
    '[ "--vz-success", "--vz-danger", "--vz-info"]'
  );
  const [xData, setxData] = useState([]);
  const [yData, setyData] = useState([]);
  const [zData, setzData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [latestX, setLatestX] = useState({});
  const [latestY, setLatestY] = useState({});
  const [latestZ, setLatestZ] = useState({});
  const [isOffline, setIsOffline] = useState(false);
  const [selectedDeviceStatus, setSelectedDeviceStatus] = useState(true); //
  const [latestTemp, setLatestTemp] = useState(null);
  const [xChartColor, setXChartColor] = useState('["--vz-secondary"]');
  //keep adding mqtt data and fetch the history and populate the charts
  //change the color of the charts to blue subtle
  const { history, getAxisHistory } = useAxisHistoryStore((state) => state);
  const { devices, getDevices } = useDevicesStore((state) => state);
  useEffect(() => {
    getDevices && getDevices();
    // Calculate the timestamp for 6 hours ago
    const hoursAgo = Date.now() - FETCH_FOR_LAST_X_HOURS;

    // Add the timestamp filter to the filters object
    getAxisHistory && getAxisHistory({ createdAt: { $gte: hoursAgo } });
  }, []);

  useEffect(() => {
    if (devices.length > 0) {
      let array = [];
      devices.map((dev) => {
        array.push({
          label: dev?.deviceId,
          value: dev._id,
          status: dev?.status,
        });
      });
      const sortedarr = array.reverse();
      console.log(sortedarr);
      setDevicesOptions(sortedarr);
      setSelectedDeviceLabel(sortedarr[0]?.label);
      setIsOffline(sortedarr[0]?.status);
    }
  }, [devices]);
  const changeChartColor = (val) => {
    if (val >= DISPLACEMENT_DANGER_THRESHOLD) {
      return '["--vz-danger"]';
    } else if (val >= DISPLACEMENT_WARNING_THRESHOLD) {
      return '["--vz-warning"]';
    } else {
      return '["--vz-secondary"]';
    }
  };
  useEffect(() => {
    //viration.displacement.x
    if (selectedDeviceLabel && history.length > 0) {
      console.log(selectedDeviceLabel);
      let xData = [];
      let yData = [];
      let zData = [];
      let tempData = [];
      let historyOfSelectedDevice = history.filter(
        (hist) => hist.deviceId === selectedDeviceLabel
      );

      historyOfSelectedDevice.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      if (historyOfSelectedDevice.length > 0) {
        //mark the latest data
        let latest = historyOfSelectedDevice[0];
        setLatestTemp(parseFloat(latest.vibration.temperature).toFixed(1));
        setLatestX({
          displacement: parseFloat(latest.vibration.displacement.x).toFixed(1),
          angle: parseFloat(latest.vibration.angle.x).toFixed(1),
          speed: parseFloat(latest.vibration.speed.x).toFixed(1),
        });
        setLatestY({
          displacement: parseFloat(latest.vibration.displacement.y).toFixed(1),
          angle: parseFloat(latest.vibration.angle.y).toFixed(1),
          speed: parseFloat(latest.vibration.speed.y).toFixed(1),
        });
        setLatestZ({
          displacement: parseFloat(latest.vibration.displacement.z).toFixed(1),
          angle: parseFloat(latest.vibration.angle.z).toFixed(1),
          speed: parseFloat(latest.vibration.speed.z).toFixed(1),
        });
        historyOfSelectedDevice.map((hist) => {
          let x = parseInt(hist.vibration.displacement.x);
          let y = parseInt(hist.vibration.displacement.y);
          let z = parseInt(hist.vibration.displacement.z);
          let temp = parseInt(hist.vibration.temperature);
          let date = parseInt(new Date(hist.createdAt).getTime());
          xData.push([date, x]);
          yData.push([date, y]);
          zData.push([date, z]);

          tempData.push([date, temp]);
        });
        setxData(xData);
        setyData(yData);
        setzData(zData);
        setTempData(tempData);
      } else {
        setxData([]);
        setyData([]);
        setzData([]);
        setTempData([]);
        setLatestTemp(null);
        setLatestX({});
        setLatestY({});
        setLatestZ({});
      }
    }
  }, [selectedDeviceLabel, history]);

  function getColorBasedOnDisplacement(displacement) {
    if (displacement !== "--") {
      if (displacement >= DISPLACEMENT_DANGER_THRESHOLD) {
        return "danger";
      } else if (displacement >= DISPLACEMENT_WARNING_THRESHOLD) {
        return "warning";
      } else {
        return "success";
      }
    }
  }
  function getColorBasedOnTemp(temp) {
    if (temp !== "--") {
      if (temp >= TEMPERATURE_DANGER_THRESHOLD) {
        return "danger";
      } else if (temp >= TEMPERATURE_WARNING_THRESHOLD) {
        return "warning";
      } else {
        return "success";
      }
    }
  }

  const chooseIcon = (axis, val) => {
    if (axis === "x") {
      return val > DISPLACEMENT_DANGER_THRESHOLD
        ? x_danger
        : val >= DISPLACEMENT_WARNING_THRESHOLD
        ? x_warning
        : x_success;
    } else if (axis === "y") {
      return val > DISPLACEMENT_DANGER_THRESHOLD
        ? y_danger
        : val >= DISPLACEMENT_WARNING_THRESHOLD
        ? y_warning
        : y_success;
    } else if (axis === "z") {
      return val > DISPLACEMENT_DANGER_THRESHOLD
        ? z_danger
        : val >= DISPLACEMENT_WARNING_THRESHOLD
        ? z_warning
        : z_success;
    }
    // Default return value or handle other cases if needed
  };
  const axesWidgets = [
    {
      id: 1,
      label: "AXE X",
      labelClass: "muted",
      badgeIcon: "ri-arrow-up-line",
      badgeClass: "bg-soft-danger",
      value: latestX?.displacement || 0,
      color: getColorBasedOnDisplacement(latestX?.displacement || 0),
      valueFlagged: false,
      speed: latestX?.speed || 0,
      icon: chooseIcon("x", latestX?.displacement),
      angle: latestX?.angle || 0,
    },
    {
      id: 2,
      label: "AXE Y",
      color: getColorBasedOnDisplacement(latestY?.displacement || 0),
      labelClass: "muted",
      badgeIcon: "ri-arrow-up-line",
      badgeClass: "bg-soft-danger",
      value: latestY?.displacement || 0,
      valueFlagged: false,
      speed: latestY?.speed || 0,
      icon: chooseIcon("y", latestY?.displacement),
      angle: latestY?.angle || 0,
    },
    {
      id: 3,
      label: "AXE Z",
      color: getColorBasedOnDisplacement(latestZ?.displacement || 0),
      labelClass: "muted",
      badgeIcon: "ri-arrow-up-line",
      badgeClass: "bg-soft-danger",
      value: latestZ?.displacement || 0,
      valueFlagged: true,
      speed: latestZ?.speed || 0,
      icon: chooseIcon("z", latestZ?.displacement),
      angle: latestZ?.angle || 0,
    },
  ];

  const tempWidget = {
    id: 1,
    lable: "Application",
    icon: "ri-arrow-up-line ",
    badgeColor: "success",
    chartColor: `["--vz-${getColorBasedOnTemp(
      latestTemp
    )}" , "--vz-transparent"]`,
    number: "16.24 %",
    series: [
      {
        name: "",
        data: tempData || [0, 0, 0],
      },
    ],
  };

  useEffect(() => {
    console.log(!isOffline);
    console.log(selectedDeviceLabel);
  }, [isOffline]);
  if (chartsReady) {
    return (
      <React.Fragment>
        <Container fluid>
          <Section
            setSelectedDeviceLabel={setSelectedDeviceLabel}
            devicesOptions={devicesOptions}
            setIsOffline={setIsOffline}
          />
          <Row>
            <Col lg={9}>
              <Card>
                <CardHeader>
                  <h1 className="card-title mb-0 ">
                    Capteur {selectedDeviceLabel}
                  </h1>
                </CardHeader>
                <CardBody>
                  <div className="my-4">
                    {/* <ChartSyncingLine
                      xData={xData}
                      dataColors='["--vz-success"]'
                      className="apex-charts"
                      dir="ltr"
                    />
                    <ChartSyncingLine2
                      yData={yData}
                      dataColors='["--vz-warning"]'
                      className="apex-charts"
                      dir ="ltr"
                    />  */}

                    {!isOffline &&
                    xData.length > 0 &&
                    yData.length > 0 &&
                    zData.length > 0 ? (
                      <>
                        {" "}
                        <ChartSyncingArea
                          xData={xData}
                          dataColors={changeChartColor(xData[0][1])} //changeChartColor(xData[0][1])
                          className="apex-charts"
                        />
                        <ChartSyncingArea2
                          yData={yData}
                          dataColors={changeChartColor(yData[0][1])} //changeChartColor(yData[0][1])
                          className="apex-charts"
                        />
                        <ChartSyncingArea3
                          zData={zData}
                          dataColors={changeChartColor(zData[0][1])} //changeChartColor(zData[0][1])
                          className="apex-charts"
                        />
                      </>
                    ) : (
                      <div style={{ height: "100%" }} className="h-full">
                        No data for the last 3 hours...
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={3}>
              {/* <Card>
                <CardBody>
                   <h1 className="text-center">
                    TEMP:{" "}
                    <span
                      className={`   text-${getColorBasedOnTemp(
                        latestTemp || 0
                      )}`}
                    >
                      {!isOffline ? latestTemp : "--"} C
                    </span>{" "}
                  </h1> 
                </CardBody>
              </Card> */}
              <Card className="card ">
                <div className="d-flex">
                  <div className="flex-grow-1  p-3">
                    <h5 className="mb-3">Temperature</h5>
                    <h1 className="mb-0 text-muted">
                      <span
                        className={`   text-${getColorBasedOnTemp(
                          latestTemp || 0
                        )}`}
                      >
                        {latestTemp ? latestTemp : "--"} C
                      </span>
                    </h1>
                  </div>
                  <div>
                    <TempChart
                      seriesData={tempWidget.series}
                      dataColors={tempWidget.chartColor}
                    />
                  </div>
                </div>
              </Card>
              {(axesWidgets || []).map((item, key) => (
                <Card key={key} className={"card-animate "}>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-column gap-1">
                        <h4 className={"fw-medium mb-0 text-muted"}>
                          {item.label}
                        </h4>{" "}
                        {/**label */}
                        <h1 className={"mt-2 ff-secondary fw-semibold "}>
                          <span className={`counter-value text-${item.color}`}>
                            {!item.value ? (
                              "--"
                            ) : (
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={""}
                                end={item.value}
                                decimals={1}
                                duration={1}
                              />
                            )}
                            {/**value */}
                          </span>
                        </h1>
                        <p>
                          Speed: {item.speed} | Angle: {item.angle}
                          {/**speed & angle */}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
}
