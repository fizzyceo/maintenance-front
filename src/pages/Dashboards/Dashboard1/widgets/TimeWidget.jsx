import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import CountUp from "react-countup";
import FeatherIcon from "feather-icons-react";
const TimeWidget = ({ item }) => {
  return (
    <Col xl={12} md={6}>
      <Card
        style={{ minHeight: "135px" }}
        className={"card-animate " + item.bgColor}
      >
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <p className={"fw-medium mb-0 text-" + item.labelClass}>
                {item.label}
              </p>
              <h2
                className={"mt-4 ff-secondary fw-semibold " + item.counterClass}
              >
                {item.subCounter.map((item, key) => (
                  <span className="counter-value" key={key}>
                    <CountUp
                      start={0}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      separator={item.separator}
                      end={item.counter}
                      decimals={item.decimals}
                      duration={2}
                    />
                  </span>
                ))}
              </h2>
              {item.matricule ? (
                <p className={"mb-0  text-" + item.labelClass}>
                  matricule:
                  <span className={"mb-0 badge " + item.badgeClass}>
                    {item.matricule}
                  </span>{" "}
                </p>
              ) : (
                <div></div>
                // <p className={"mb-0 text-" + item.labelClass}>
                //   <span className={"mb-0 badge " + item.badgeClass}>
                //     <i className={"align-middle " + item.badge}></i>{" "}
                //     {item.percentage}
                //   </span>{" "}
                //   vs. yesterday
                // </p>
              )}
            </div>
            <div>
              <div className="avatar-sm flex-shrink-0">
                <span
                  className={
                    "avatar-title rounded-circle fs-2 bg-soft-" + item.iconClass
                  }
                >
                  <FeatherIcon icon={item.feaIcon} className={""} />
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TimeWidget;
