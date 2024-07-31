import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import CountUp from "react-countup";

const WidgetInfo = ({ item }) => {
  return (
    <Col xl={12} md={6}>
      <Card
        style={{ minHeight: "146px" }}
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
                {item?.subCounter?.length > 0 ? (
                  item?.subCounter?.map((item, key) => (
                    <span className="counter-value" key={key}>
                      <CountUp
                        start={0}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        separator={item.separator}
                        end={item.counter}
                        decimals={item.decimals}
                        duration={0.5}
                      />
                    </span>
                  ))
                ) : (
                  <div>
                    <h4 className={"fs-22 fw-semibold ff-secondary mb-4 "}>
                      <span className="counter-value" data-target="559.25">
                        <CountUp
                          start={0}
                          prefix={item.prefix}
                          suffix={item.suffix}
                          separator={item.separator}
                          end={item.counter}
                          decimals={item.decimals}
                          duration={0.5}
                        />
                      </span>
                    </h4>
                  </div>
                )}
              </h2>
              {/* <p className={"mb-0 text-" + item.labelClass}>
                <span className={"mb-0 badge " + item.badgeClass}>
                  <i className={"align-middle " + item.badge}></i>{" "}
                  {item.percentage}
                </span>{" "}
                vs. mois précédent
              </p> */}
            </div>
            <div>
              <div
                className="avatar-sm flex-shrink-0"
                style={{
                  transform: !item.in ? "scaleX(-1)" : " ",
                }}
              >
                <span
                  className={
                    "avatar-title rounded-circle fs-2 bg-soft-" + item.iconClass
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="20"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WidgetInfo;
