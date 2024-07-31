import React, { useEffect, useState } from "react";
import "./jquery-jvectormap.scss";
import "./leafletstyling.scss";
import { useDevicesStore } from "../../../../stores/Devices";
import DevicePopup from "./DevicePopup";
import { usesitesStore } from "../../../../stores/Sites";
import { useAlertsStore } from "../../../../stores/Alerts";
import greenState from "../../../../assets/imgs/states/map_icon_green.png";
import redState from "../../../../assets/imgs/states/map_icon_red.png";
import grayState from "../../../../assets/imgs/states/map_icon_gray.png";
import orangeState from "../../../../assets/imgs/states/map_icon_orange.png";
import { Marker, MapContainer, TileLayer, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import { useSelector } from "react-redux";

// import x from "../../../../assets/images/bg-d.png"
const Vectormap = (props) => {
  const map = React.createRef(null);
  const { getDevices, devices } = useDevicesStore((state) => state);
  const { getSites, sites } = usesitesStore((state) => state);
  const { alerts, getAlerts } = useAlertsStore((state) => state);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));
  useEffect(() => {
    getDevices();
    getSites && getSites();
    getAlerts && getAlerts();
  }, []);

  useEffect(() => {
    if (!sites?.length) return;
  }, [sites]);

  const getMarkerColor = (status) => {
    if (status?.toLowerCase() === "online") {
      return greenState;
    } else if (status?.toLowerCase() === "offline") {
      return grayState;
    } else if (status?.toLowerCase() === "semi-online") {
      return orangeState;
    } else if (status?.toLowerCase() === "danger") {
      return redState;
    }
  };

  const handleMarkerClick = (e, code) => {
    // Set the selected marker when a marker is clicked
    setSelectedMarker(sites[code]);
    setShowDeviceModal(!showDeviceModal);
  };

  const markers = sites.map((site, indx) => ({
    key: indx,
    type: "site",
    latLng: [site.location.coordinates[0], site.location.coordinates[1]],
    alert: false,
    icon: new Icon({
      iconUrl: getMarkerColor(site?.status),
      iconSize: [18, 18],
    }),
  }));
  const alertMarkers = alerts.map((alert, indx) => ({
    key: indx,
    type: "alert",
    latLng: [alert.location.coordinates[0], alert.location.coordinates[1]],
    alert: true,
    icon: new divIcon({
      iconSize: [20, 20],
      iconAnchor: [15, 15],
      className: "alert-icon",
    }),
    // icon:new Icon({

    //   iconUrl:FlameSVG,
    //   iconSize:[18,18]
    // }),
  }));
  const allMarkers = [...alertMarkers, ...markers];
  const handleMarkerLabelShow = (e, label, code) => {
    // Prevent the default tooltip from showing
    return false;
  };

  return (
    <>
      <div
        className={`${
          layoutModeType === "dark" && props.mapMode === "normal"
            ? "leaflet-darkmode"
            : ""
        } map-main relative`}
        style={{ width: props.width, height: 500 }}
      >
        <MapContainer
          center={[36.37377988878743, 3.8951729813480367]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={props.layer}
          />
          {/**"https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"  //satellite*/}
          {allMarkers &&
            allMarkers.map((marker, indx) => (
              <Marker
                eventHandlers={{
                  click: (e) => {
                    if (marker.type === "site") {
                      setSelectedMarker(sites[marker.key]);
                      setShowDeviceModal(!showDeviceModal);
                    }
                  },
                }}
                icon={marker?.icon}
                key={indx}
                position={[marker.latLng[0], marker.latLng[1]]}
              >
                {/* <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup> */}
              </Marker>
            ))}
        </MapContainer>

        {selectedMarker && (
          <DevicePopup
            selectedMarker={selectedMarker}
            showDeviceModal={showDeviceModal}
            handleMarkerClick={handleMarkerClick}
          />
        )}
      </div>
    </>
  );
};

export default Vectormap;
