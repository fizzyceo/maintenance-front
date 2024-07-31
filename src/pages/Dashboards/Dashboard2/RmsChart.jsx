import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";
import ReactApexChart from "react-apexcharts";
const RmsChart = ({ data, dataColors }) => {
  var ChartSyncingAreaC1 = getChartColorsArray(dataColors);
  const series = [
    {
      data: data,
      color: ChartSyncingAreaC1[0],
    },
  ];

  var options = {
    chart: {
      id: "fb",
      type: "area",
      height: 160,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 3,
    },
    toolbar: {
      tools: {
        selection: false,
      },
    },
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => `${val.toFixed(1)} um`,
      },
      x: {
        show: true,
        formatter: (val) => {
          const date = new Date(val);
          const month = date.toLocaleString("default", { month: "short" });
          const day = date.getDate();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return `${hour}:${minutes}`;
        },
      },
    },
    grid: {
      clipMarkers: false,
    },
    yaxis: {
      tickAmount: 2,
      min: 0, // Ensure y-axis starts from 0
    },
    xaxis: {
      type: "datetime",
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="area"
        height="160"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default RmsChart;
