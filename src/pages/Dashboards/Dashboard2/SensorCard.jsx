import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import {
  RMS_DANGER_THRESHOLD,
  RMS_MEDIUM_THRESHOLD,
  RMS_WARNING_THRESHOLD,
  TEMPERATURE_DANGER_THRESHOLD,
  TEMPERATURE_WARNING_THRESHOLD,
} from "../../../common/config";
import TempChart from "../Dashboard1/Charts/Charts";
import {
  ChartSyncingArea,
  ChartSyncingArea2,
} from "../Dashboard1/Charts/Echarts";
import RmsChart from "./RmsChart";
import blueIcon from "../../../assets/icons/vibration-blue.png";
import redIcon from "../../../assets/icons/vibration-red.png";
import grayIcon from "../../../assets/icons/vibration-gray.png";
import greenIcon from "../../../assets/icons/vibration-green.png";
import orangeIcon from "../../../assets/icons/vibration-orange.png";
const SensorCard = ({ status, deviceId, relevantHistory }) => {
  const [isOffline, setIsOffline] = useState(false);

  const [tempData, setTempData] = useState([]);
  const [latestTemp, setLatestTemp] = useState(null);
  const [rmsData, setRmsData] = useState([]);
  const [latestRms, setLatestRms] = useState(null);
  const [chosenIcon, setChosenIcon] = useState(null);

  const chooseIcon = (rms) => {
    if (status === 0) {
      setChosenIcon(grayIcon);
    } else {
      if (rms >= RMS_DANGER_THRESHOLD) {
        setChosenIcon(redIcon);
      } else if (rms >= RMS_WARNING_THRESHOLD) {
        setChosenIcon(orangeIcon);
      } else if (rms >= RMS_MEDIUM_THRESHOLD) {
        setChosenIcon(blueIcon);
      } else {
        setChosenIcon(greenIcon);
      }
    }
  };

  useEffect(() => {
    if (status === 0) {
      setIsOffline(true);
    } else {
      setIsOffline(false);
    }
  }, [status]);
  useEffect(() => {
    if (relevantHistory.length > 0) {
      let tempData = [];
      let rmsData = [];
      let historyOfSelectedDevice = relevantHistory.filter(
        (hist) => hist.deviceId === deviceId
      );
      historyOfSelectedDevice.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      if (historyOfSelectedDevice.length > 0) {
        let latest = historyOfSelectedDevice[0];

        setLatestTemp(parseFloat(latest.vibration.temperature).toFixed(1));
        setLatestRms(parseFloat(latest.rms || 0).toFixed(1));
        chooseIcon(latest.rms);

        historyOfSelectedDevice.map((hist) => {
          let temp = parseFloat(hist.vibration.temperature).toFixed(1);

          let rms = parseFloat(hist.rms).toFixed(1);

          let date = parseInt(new Date(hist.createdAt).getTime());

          tempData.push([date, temp]);
          if (isNaN(rms)) rms = 0;
          rmsData.push([date, rms]);
        });
        console.log(tempData);
        setTempData(tempData);
        setRmsData(rmsData);
      } else {
        setTempData([]);
        setRmsData([]);
        setLatestTemp(0);
        setLatestRms(0);
      }
    }
  }, [relevantHistory]);
  function getColorBasedOnRMS(rms) {
    if (rms !== "--") {
      if (rms >= RMS_DANGER_THRESHOLD) {
        return "danger";
      } else if (rms >= RMS_WARNING_THRESHOLD) {
        return "warning";
      } else if (rms >= RMS_MEDIUM_THRESHOLD) {
        return "[#f7b84b]";
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

  const changeChartColor = (val) => {
    if (val >= RMS_DANGER_THRESHOLD) {
      return '["--vz-danger"]';
    } else if (val >= RMS_WARNING_THRESHOLD) {
      return '["--vz-warning"]';
    } else if (val >= RMS_MEDIUM_THRESHOLD) {
      return '["--vz-medium"]';
    } else {
      return '["--vz-success"]';
    }
  };
  //talk about these notes
  function getNoteBasedOnRMS(rms) {
    if (rms >= RMS_DANGER_THRESHOLD) {
      return "Vibration causes damage";
    } else if (rms >= RMS_WARNING_THRESHOLD) {
      return "Short term operation allowable.";
    } else if (rms >= RMS_MEDIUM_THRESHOLD) {
      return "Unlimited long-term operation allowable.";
    } else {
      return "New machine condition";
    }
  }
  return (
    <Row>
      <Col lg={8}>
        <Card>
          <CardHeader>
            <h1 className="card-title mb-0 ">Capteur {deviceId}</h1>
          </CardHeader>
          <CardBody>
            <div className="my-4">
              {rmsData.length > 0 ? (
                <>
                  <RmsChart
                    data={rmsData}
                    dataColors={changeChartColor(latestRms)}
                    className="apex-charts"
                  />
                </>
              ) : (
                <div style={{ height: "100%" }} className="h-full">
                  No data for the last 3 hours...
                </div>
              )}
            </div>{" "}
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <div className="h-100 w-100 d-flex flex-column">
          <Row className={"flex-grow-1"}>
            <Card className="card ">
              <div className="d-flex">
                <div className="flex-grow-1  p-3">
                  <h4 className="mb-3">RMS</h4>
                  <h2
                    className={` font-bold  text-${getColorBasedOnRMS(
                      latestRms || 0
                    )}`}
                  >
                    <strong>{!isOffline ? latestRms || 0 : "--"} </strong>
                    <small>mm/s</small>
                  </h2>
                </div>
                <div className="avatar-sm flex-shrink-0 mr-3 mt-3">
                  <img width={64} src={chosenIcon} alt="" />
                </div>
              </div>
              <div className="ml-3 mb-2 ">{getNoteBasedOnRMS(latestRms)}</div>
            </Card>
          </Row>

          <Row className={"flex-grow-1"}>
            <Card className="card ">
              <div className="d-flex justify-content-center">
                <div className="flex-grow-1  p-3">
                  <h5 className="mb-3">Temperature</h5>
                  <h1 className="mb-0 text-muted">
                    <span
                      className={`   text-${getColorBasedOnTemp(
                        latestTemp || 0
                      )}`}
                    >
                      {!isOffline ? latestTemp || 0 : "--"} C
                    </span>
                  </h1>
                </div>
                <div style={{ width: "fit-content" }}>
                  <TempChart
                    seriesData={[
                      {
                        name: "",
                        data: tempData || [0, 0, 0],
                      },
                    ]}
                    dataColors={`["--vz-${getColorBasedOnTemp(
                      latestTemp
                    )}" , "--vz-transparent"]`}
                  />
                </div>
              </div>
            </Card>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default SensorCard;
