import { t } from "i18next";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import FeatherIcon from "feather-icons-react";

import Select from "react-select";

const BreadCrumb = ({
  title,
  pageTitle,
  handleCenter,
  locationTitle,
  toggleMapType,
  selectedMulti,
  setselectedMulti,
}) => {
  function handleMulti(selectedMulti) {
    // update the store of the selected option
    setselectedMulti(selectedMulti);
  }
  const SingleOptions = [
    { value: "WildFire", label: "WildFire" },
    { value: "WindStatus", label: "WindStatus" },
    { value: "Temperature", label: "Temperature" },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 text-center">{t(title)}</h4>

            {/* <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="#">{t(pageTitle)}</Link></li>
                                <li className="breadcrumb-item active">{t(title)}</li>
                            </ol>
                        </div> */}
            <Col className="col-lg-6 d-flex justify-content-center align-items-end gap-0">
              <Col className="col-2">
                <h4>
                  <strong>Alerts:</strong>{" "}
                </h4>
              </Col>
              <Col className="col-10">
                <Select
                  value={selectedMulti}
                  isMulti={true}
                  onChange={(e) => {
                    handleMulti(e);
                  }}
                  options={SingleOptions}
                />
              </Col>
            </Col>

            {/* <div className="d-flex gap-2 justify-content-center mb-2">
                            <button
                                className="btn m-0"
                                onClick={handleCenter}
                            >
                                <FeatherIcon icon="map-pin" size="20" fill="red" /> {locationTitle}
                            </button>
                            <button className="btn btn-danger m-0" onClick={toggleMapType}>
                                {t("Change Map Type")}
                            </button>
                        </div> */}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
