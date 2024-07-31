import React from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
const DevicePopup = ({
  selectedMarker,
  showDeviceModal,
  handleMarkerClick,
}) => {
  return (
    <Modal isOpen={showDeviceModal} toggle={handleMarkerClick}>
      <ModalHeader>
        <div>
          <h4> Site Informations</h4>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="popup bg-blue-a200">
          <p>
            <strong>Label: </strong>
            {selectedMarker.name}
          </p>
          <p>
            <strong>Status: </strong>
            {selectedMarker.status}
          </p>
          <p>
            <strong>Wilaya: </strong>
            {selectedMarker.wilaya}
          </p>
          <p>
            <strong>Region: </strong>
            {selectedMarker.region}
          </p>
          <button onClick={() => handleMarkerClick(null)}>Close</button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DevicePopup;
