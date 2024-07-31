import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import WidgetInfo from "./widgets/WidgetInfo";
import WidgetTotal from "./widgets/WidgetTotal";
import PieChart from "./widgets/PieChart";

const WidgetsContainer = ({ item }) => {
  console.log(item);
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "1rem",
        border: "1px solid black",
      }}
    >
      <CardHeader>
        <h4 className={" mb-0 "}>{item?.title || "NUMILOG"}</h4>
      </CardHeader>

      <WidgetInfo item={item.entry} />

      <WidgetInfo item={item.exit} />

      <PieChart
        title={item.chart.title}
        styling={item.chart.style}
        series={item.chart.series}
        options={item.chart.options}
      />
    </Card>
  );
};

export default WidgetsContainer;
