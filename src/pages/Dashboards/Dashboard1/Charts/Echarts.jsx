import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";
import ReactApexChart from "react-apexcharts";
import { color } from "echarts";
export const ChartSyncingLine2 = ({ yData, dataColors }) => {
  var chartSyncingColors2 = getChartColorsArray(dataColors);
  const series = [
    {
      data: yData,
    },
  ];
  var options = {
    chart: {
      id: "tw",
      group: "social",
      type: "line",
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
    colors: chartSyncingColors2,
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
        type="line"
        height="160"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export const ChartSyncingArea = ({ xData, dataColors, id }) => {
  var ChartSyncingAreaC1 = getChartColorsArray(dataColors);

  const series = [
    {
      data: xData,
      color: ChartSyncingAreaC1[0],
    },
  ];

  var options = {
    chart: {
      id: "fb",
      group: "social",
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
    // colors: ChartSyncingAreaC1,
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

export const ChartSyncingArea2 = ({ yData, dataColors, id }) => {
  const [chartColor2, setChartColor2] = useState(["#ffff"]);
  var ChartSyncingAreaC2 = getChartColorsArray(dataColors);

  const series = [
    {
      data: yData,
      color: ChartSyncingAreaC2[0],
    },
  ];

  var options = {
    chart: {
      id: "tw",
      group: "social",

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
    // colors: ChartSyncingAreaC2,
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    tooltip: {
      followCursor: false,
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
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

export const ChartSyncingArea3 = ({ zData, dataColors, id }) => {
  const [chartColor3, setChartColor3] = useState(["#ffff"]);
  var ChartSyncingAreaC3 = getChartColorsArray(dataColors);
  const series = [
    {
      data: zData,
      color: ChartSyncingAreaC3[0],
    },
  ];

  var options = {
    chart: {
      id: "yt",
      group: "social",
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
    // colors: chartColor3,
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
