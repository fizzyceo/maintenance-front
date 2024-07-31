import { t } from "i18next";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

const Widget = (props) => {
  const { data, ...rest } = props;
  return (
    <React.Fragment>
      <Col {...rest} className="p-0" style={{height:"86%"}} >
        <Card className="card-animate m-0" style={{height:"100%"}}>
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex align-items-center ">
              <div className="flex-grow-1 overflow-hidden">
                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                  {t(data.label)}
                </p>
              </div>
              <div className="flex-shrink-0">
                <h5 className={"fs-14 mb-0 text-" + data.percentageClass}>
                  {data.percentageIcon ? (
                    <i
                      className={"fs-13 align-middle " + data.percentageIcon}
                    ></i>
                  ) : null}
                  {data.percentage}
                </h5>
              </div>
            </div>
            <div className="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                  <span className="counter-value">
                    <CountUp
                      start={0}
                      prefix={data.prefix}
                      suffix={data.suffix}
                      separator={data.separator}
                      end={data.counter}
                      decimals={data.decimals}
                      duration={1}
                    />
                  </span>
                </h4>
                <Link to={data.link} className="text-decoration-underline">
                  {data.linkText}
                </Link>
              </div>
              <div className="avatar-sm flex-shrink-0">
                {/* <span
                  className={
                    "avatar-title rounded fs-3 bg-soft-" +
                    data.iconBackgroundClass
                  }
                >
                  <i className={`text-${data.iconClass} ${data.icon}`}></i>
                </span> */}
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Widget;
