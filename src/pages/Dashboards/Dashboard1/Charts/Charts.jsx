import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";

const TempChart = ({ seriesData, dataColors }) => {
  var StatisticsColors = getChartColorsArray(dataColors);
  const options = {
    chart: {
      width: 140,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => `${val.toFixed(1)} C`,
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
    colors: StatisticsColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={seriesData}
        type="area"
        height={120}
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default TempChart;
