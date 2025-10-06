import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";

const FrequencyChart = ({ s1Data, s2Data }) => {
  const dataColors = '["#8b5cf6", "#7c3aed"]'; // Purple colors (similar shades)
  var chartColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "Channel S1",
      data: s1Data,
      color: chartColors[0],
    },
    {
      name: "Channel S2",
      data: s2Data,
      color: chartColors[1],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: chartColors,
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    tooltip: {
      shared: true,
      y: {
        formatter: (val) => `${val.toFixed(1)} Hz`,
      },
      x: {
        formatter: (val) => {
          const date = new Date(val);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          return `${hours}:${minutes}:${seconds}`;
        },
      },
    },
    grid: {
      clipMarkers: false,
      show: true,
      borderColor: "#e0e0e0",
    },
    yaxis: {
      title: {
        text: "Frequency (Hz)",
        style: {
          color: "#666",
          fontSize: "12px",
        },
      },
      tickAmount: 5,
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Time",
        style: {
          color: "#666",
          fontSize: "12px",
        },
      },
      labels: {
        formatter: (val) => {
          const date = new Date(val);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      markers: {
        width: 8,
        height: 8,
        radius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="line"
        height="300"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default FrequencyChart;
