import React, { useEffect, useState } from "react";
import Section from "./Section";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { useAxisHistoryStore } from "../../../stores/AxisHistory";
import { useAssetsStore } from "../../../stores/Assets";
import { FETCH_FOR_LAST_X_HOURS } from "../../../common/config";
import { useDevicesStore } from "../../../stores/Devices";
import SensorCard from "./SensorCard";

const Dashboard2 = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState({});
  const [assetsOptions, setAssetsOptions] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const { history, getAxisHistory } = useAxisHistoryStore((state) => state);
  const { assets, getAssets } = useAssetsStore((state) => state);
  const { devices, getDevices } = useDevicesStore((state) => state);

  const [relevantHistory, setrelevantHistory] = useState([]);

  useEffect(() => {
    if (assets.length > 0) {
      let array = [];
      assets.map((as) => {
        array.push({
          label: as?.name,
          value: as._id,
        });
      });
      const sortedarr = array.reverse();
      setAssetsOptions(sortedarr);
      setSelectedAsset(sortedarr[0]);
    }
  }, [assets]);
  useEffect(() => {
    getAssets && getAssets();
    // Calculate the timestamp for 6 hours ago
    const hoursAgo = Date.now() - FETCH_FOR_LAST_X_HOURS;

    // Add the timestamp filter to the filters object
    getAxisHistory && getAxisHistory({ createdAt: { $gte: hoursAgo } });
  }, []);
  useEffect(() => {
    if (selectedAsset?.value) {
      console.log(selectedAsset);
      getDevices({ assetId: selectedAsset.value });
    }
  }, [selectedAsset]);
  useEffect(() => {
    console.log(devices);
    setDeviceList(devices.reverse());
    let relevantHist = history.filter((h) =>
      devices.some((d) => d.deviceId === h.deviceId)
    );
    relevantHist.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt));

    setrelevantHistory(relevantHist);
  }, [devices]);
  return (
    <React.Fragment>
      <Container fluid>
        <Section
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          assetsOptions={assetsOptions}
          setIsOffline={setIsOffline}
        />
        {deviceList.length > 0 &&
          deviceList.map((dev) => (
            <SensorCard
              key={dev._id}
              status={dev.status}
              deviceId={dev.deviceId}
              relevantHistory={relevantHistory}
            />
          ))}
      </Container>
    </React.Fragment>
  );
};

export default Dashboard2;
