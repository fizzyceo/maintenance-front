import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const PieChart = ({ styling, title, series, options }) => {
  console.log(styling);
  return (
    <Col xl={12} md={6}>
      <Card className={"card-animate "}>
        <CardBody>
          <ReactApexChart
            dir="ltr"
            className="apex-charts"
            series={series}
            options={options}
            type="donut"
            height={250}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PieChart;
