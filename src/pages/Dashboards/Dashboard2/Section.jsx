import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

import ReactSelect from "react-select";
import styled from "styled-components";
import {
  prepareSelectOptions,
  reactSelectStyling,
} from "../../../Components/Common/Forms/FormikInputHelper";
const Section = ({
  selectedAsset,
  setSelectedAsset,
  assetsOptions,
  setIsOffline,
}) => {
  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">Machine: {selectedAsset.label}</h4>
            </div>
            <div className="mt-3 mt-lg-0">
              <form action="#">
                <Row className="g-3 mb-0 align-items-center">
                  <div className="col-sm-auto">
                    <div className="input-group">
                      <StyledFilterWrapper>
                        <ReactSelect
                          {...reactSelectStyling}
                          options={assetsOptions}
                          isSearchable={true}
                          placeholder={assetsOptions[0]?.label || "Machine"}
                          isClearable={true}
                          name={"search"}
                          onChange={(option) => {
                            setSelectedAsset(option);
                            // setIsOffline(option?.status === 0 ? true : false);
                            //check if the option is null
                          }}
                        />
                      </StyledFilterWrapper>

                      {/* put a selector here */}
                    </div>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;

const StyledFilterWrapper = styled.div`
  min-width: 450px;
  // flex: 1;
`;
