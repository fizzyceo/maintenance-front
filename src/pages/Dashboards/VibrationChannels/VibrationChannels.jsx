import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { t } from "i18next";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";
import { useDatePickerStore } from "../../../stores/datePickerStore";
import { useDevicesStore } from "../../../stores/Devices";
import { useAxisHistoryStore } from "../../../stores/AxisHistory";
import Loader from "../../../Components/Common/Loader";
import { FETCH_FOR_LAST_X_HOURS } from "../../../common/config";
import VelocityChart from "./Charts/VelocityChart";
import AccelerationChart from "./Charts/AccelerationChart";
import FrequencyChart from "./Charts/FrequencyChart";
import TemperatureChart from "./Charts/TemperatureChart";

export default function VibrationChannels() {
  const [chartsReady, setChartsReady] = useState(true);
  const [selectedDeviceLabel, setSelectedDeviceLabel] = useState("DL001");
  const [devicesOptions, setDevicesOptions] = useState([]);
  
  // Chart data states
  const [velocityData, setVelocityData] = useState({ s1: [], s2: [] });
  const [accelerationData, setAccelerationData] = useState({ s1: [], s2: [] });
  const [frequencyData, setFrequencyData] = useState({ s1: [], s2: [] });
  const [temperatureData, setTemperatureData] = useState({ s1: [], s2: [] });
  
  const { history, getAxisHistory } = useAxisHistoryStore((state) => state);
  const { devices, getDevices } = useDevicesStore((state) => state);

  useEffect(() => {
    getDevices && getDevices();
    // Calculate the timestamp for last 24 hours
    const hoursAgo = Date.now() - (24 * 60 * 60 * 1000);
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
      
      // Sort to prioritize DL001, then reverse the rest
      const sortedarr = array.sort((a, b) => {
        if (a.label === 'DL001') return -1;
        if (b.label === 'DL001') return 1;
        return 0;
      }).reverse();
      
      setDevicesOptions(sortedarr);
      
      // Set DL001 as default if available, otherwise use first device
      const dl001 = sortedarr.find(device => device.label === 'DL001');
      if (dl001) {
        setSelectedDeviceLabel('DL001');
      } else if (sortedarr.length > 0) {
        setSelectedDeviceLabel(sortedarr[0]?.label);
      }
    }
  }, [devices]);

  useEffect(() => {
    if (selectedDeviceLabel && history.length > 0) {
      console.log("Processing data for device:", selectedDeviceLabel);
      
      // Filter history for selected device
      let historyOfSelectedDevice = history.filter(
        (hist) => hist.deviceId === selectedDeviceLabel
      );

      historyOfSelectedDevice.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      if (historyOfSelectedDevice.length > 0) {
        // Initialize data arrays
        let velocityS1 = [];
        let velocityS2 = [];
        let accelerationS1 = [];
        let accelerationS2 = [];
        let frequencyS1 = [];
        let frequencyS2 = [];
        let temperatureS1 = [];
        let temperatureS2 = [];

        historyOfSelectedDevice.forEach((hist) => {
          // Process raw packet data
          if (hist.rawPacket && hist.rawPacket.channels) {
            const channels = hist.rawPacket.channels;
            
            // Process S1 channel
            if (channels.S1 && Array.isArray(channels.S1)) {
              channels.S1.forEach((reading) => {
                const timestamp = new Date(hist.createdAt).getTime();
                velocityS1.push([timestamp, reading.velocity]);
                accelerationS1.push([timestamp, reading.acceleration]);
                frequencyS1.push([timestamp, reading.frequency]);
                temperatureS1.push([timestamp, reading.temperature]);
              });
            }
            
            // Process S2 channel
            if (channels.S2 && Array.isArray(channels.S2)) {
              channels.S2.forEach((reading) => {
                const timestamp = new Date(hist.createdAt).getTime();
                velocityS2.push([timestamp, reading.velocity]);
                accelerationS2.push([timestamp, reading.acceleration]);
                frequencyS2.push([timestamp, reading.frequency]);
                temperatureS2.push([timestamp, reading.temperature]);
              });
            }
          }
        });

        // Update state with processed data
        setVelocityData({ s1: velocityS1, s2: velocityS2 });
        setAccelerationData({ s1: accelerationS1, s2: accelerationS2 });
        setFrequencyData({ s1: frequencyS1, s2: frequencyS2 });
        setTemperatureData({ s1: temperatureS1, s2: temperatureS2 });

        console.log("Data processed:", {
          velocity: velocityS1.length + velocityS2.length,
          acceleration: accelerationS1.length + accelerationS2.length,
          frequency: frequencyS1.length + frequencyS2.length,
          temperature: temperatureS1.length + temperatureS2.length,
        });
      } else {
        // Reset data if no history found
        setVelocityData({ s1: [], s2: [] });
        setAccelerationData({ s1: [], s2: [] });
        setFrequencyData({ s1: [], s2: [] });
        setTemperatureData({ s1: [], s2: [] });
      }
    }
  }, [selectedDeviceLabel, history]);

  const handleDeviceChange = (deviceId) => {
    const device = devicesOptions.find(d => d.value === deviceId);
    if (device) {
      setSelectedDeviceLabel(device.label);
    }
  };

  const downloadChartData = (chartType, data) => {
    const csvData = [];
    csvData.push(['Timestamp', 'Channel S1', 'Channel S2']);
    
    // Get all unique timestamps
    const allTimestamps = new Set();
    data.s1.forEach(point => allTimestamps.add(point[0]));
    data.s2.forEach(point => allTimestamps.add(point[0]));
    
    const sortedTimestamps = Array.from(allTimestamps).sort();
    
    sortedTimestamps.forEach(timestamp => {
      const s1Value = data.s1.find(point => point[0] === timestamp)?.[1] || '';
      const s2Value = data.s2.find(point => point[0] === timestamp)?.[1] || '';
      const date = new Date(timestamp);
      csvData.push([
        date.toISOString(),
        s1Value,
        s2Value
      ]);
    });
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartType}_${selectedDeviceLabel}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (chartsReady) {
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h1 className="card-title mb-0">
                    Vibration Monitoring Dashboard
                  </h1>
                </CardHeader>
                <CardBody>
                  <div className="d-flex align-items-center mb-4">
                    <label className="me-3">Select Device:</label>
                    <select
                      className="form-select"
                      style={{ width: "200px" }}
                      value={devicesOptions.find(d => d.label === selectedDeviceLabel)?.value || ""}
                      onChange={(e) => handleDeviceChange(e.target.value)}
                    >
                      {devicesOptions.map((device) => (
                        <option key={device.value} value={device.value}>
                          {device.label}
                        </option>
                      ))}
                    </select>
                    <span className="ms-3 text-muted">Showing last 24 hours</span>
                  </div>

                  {/* Velocity Chart */}
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">Velocity</h5>
                        <div className="d-flex align-items-center">
                          <span className="me-3">
                            <span className="badge me-1" style={{backgroundColor: '#3b82f6', color: 'white'}}>Channel S1</span>
                            <span className="badge me-1" style={{backgroundColor: '#1d4ed8', color: 'white'}}>Channel S2</span>
                          </span>
                          <div className="d-flex gap-2">
                            <i className="ri-zoom-in-line"></i>
                            <i className="ri-download-line" style={{cursor: 'pointer'}} onClick={() => downloadChartData('velocity', velocityData)}></i>
                            <i className="ri-more-2-line"></i>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <VelocityChart 
                        s1Data={velocityData.s1} 
                        s2Data={velocityData.s2}
                      />
                    </CardBody>
                  </Card>

                  {/* Acceleration Chart */}
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">Acceleration</h5>
                        <div className="d-flex align-items-center">
                          <span className="me-3">
                            <span className="badge me-1" style={{backgroundColor: '#f97316', color: 'white'}}>Channel S1</span>
                            <span className="badge me-1" style={{backgroundColor: '#ea580c', color: 'white'}}>Channel S2</span>
                          </span>
                          <div className="d-flex gap-2">
                            <i className="ri-zoom-in-line"></i>
                            <i className="ri-download-line" style={{cursor: 'pointer'}} onClick={() => downloadChartData('acceleration', accelerationData)}></i>
                            <i className="ri-more-2-line"></i>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <AccelerationChart 
                        s1Data={accelerationData.s1} 
                        s2Data={accelerationData.s2}
                      />
                    </CardBody>
                  </Card>

                  {/* Frequency Chart */}
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">Frequency</h5>
                        <div className="d-flex align-items-center">
                          <span className="me-3">
                            <span className="badge me-1" style={{backgroundColor: '#8b5cf6', color: 'white'}}>Channel S1</span>
                            <span className="badge me-1" style={{backgroundColor: '#7c3aed', color: 'white'}}>Channel S2</span>
                          </span>
                          <div className="d-flex gap-2">
                            <i className="ri-zoom-in-line"></i>
                            <i className="ri-download-line" style={{cursor: 'pointer'}} onClick={() => downloadChartData('frequency', frequencyData)}></i>
                            <i className="ri-more-2-line"></i>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <FrequencyChart 
                        s1Data={frequencyData.s1} 
                        s2Data={frequencyData.s2}
                      />
                    </CardBody>
                  </Card>

                  {/* Temperature Chart */}
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">Temperature</h5>
                        <div className="d-flex align-items-center">
                          <span className="me-3">
                            <span className="badge me-1" style={{backgroundColor: '#ef4444', color: 'white'}}>Channel S1</span>
                            <span className="badge me-1" style={{backgroundColor: '#dc2626', color: 'white'}}>Channel S2</span>
                          </span>
                          <div className="d-flex gap-2">
                            <i className="ri-zoom-in-line"></i>
                            <i className="ri-download-line" style={{cursor: 'pointer'}} onClick={() => downloadChartData('temperature', temperatureData)}></i>
                            <i className="ri-more-2-line"></i>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <TemperatureChart 
                        s1Data={temperatureData.s1} 
                        s2Data={temperatureData.s2}
                      />
                    </CardBody>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
}
