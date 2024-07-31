import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";
import ReactApexChart from "react-apexcharts";
import {
  RMS_DANGER_THRESHOLD,
  RMS_MEDIUM_THRESHOLD,
  RMS_WARNING_THRESHOLD,
} from "../../common/config";
const RmsChart = ({ isLoading, history, dataColors }) => {
  // const [chartColor, setChartColor] = useState("#FF5733");
  const [seriesData, setSeriesData] = useState([]);
  const [markersColors, setMarkerColors] = useState([]);
  useEffect(() => {
    if (history.length > 0) {
      const formattedData = history.map((dataPoint) => ({
        x: dataPoint.ts,
        y: parseFloat(dataPoint.rms || 0).toFixed(1),
      }));

      // Sorting data by timestamp
      formattedData.sort((a, b) => a.x - b.x);
      setSeriesData(formattedData);
      // let latestVal = formattedData[formattedData.length - 1];
      // if (parseFloat(latestVal?.y || 0) >= RMS_DANGER_THRESHOLD) {
      //   setChartColor("#FF5733");
      // } else if (parseFloat(latestVal?.y || 0) >= RMS_WARNING_THRESHOLD) {
      //   setChartColor("#f1963b");
      // } else if (parseFloat(latestVal?.y || 0) >= RMS_MEDIUM_THRESHOLD) {
      //   setChartColor("#f7b84b");
      // } else {
      //   setChartColor("#33FF57");
      // }
      const markerStyles = formattedData.map((data, index) => {
        let style = {}; // Default empty style object
        if (parseFloat(data.y) >= RMS_DANGER_THRESHOLD) {
          style = {
            seriesIndex: 0,
            dataPointIndex: index,
            fillColor: "#FF5733",
            strokeColor: "#fff",
            size: 5,
            shape: "circle",
          };
        } else if (parseFloat(data.y) >= RMS_WARNING_THRESHOLD) {
          style = {
            seriesIndex: 0,
            dataPointIndex: index,
            fillColor: "#f1963b",
            strokeColor: "#eee",
            size: 4,
            shape: "circle",
          };
        } else if (parseFloat(data.y) >= RMS_MEDIUM_THRESHOLD) {
          style = {
            seriesIndex: 0,
            dataPointIndex: index,
            fillColor: "#f7b84b",
            strokeColor: "#eee",
            size: 4,
            shape: "circle",
          };
        } else {
          style = {
            seriesIndex: 0,
            dataPointIndex: index,
            fillColor: "#33FF57",
            strokeColor: "#eee",
            size: 4,
            shape: "circle",
          };
        }
        return style;
      });

      setMarkerColors(markerStyles);
    }
  }, [history]);
  const series = [
    {
      name: "RMS",
      data: seriesData,
      color: "#808080",
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
      discrete: markersColors, // Use dynamically determined marker styles
    },
    tooltip: {
      // shared: false,
      y: {
        formatter: (val) => `${val.toFixed(1)} mm/s`,
      },
      x: {
        show: true,
        formatter: (val) => {
          const date = new Date(val);
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return `${hour}:${minutes}`;
        },
      },
    },
    grid: {
      clipMarkers: false,
    },
    title: {
      text: "RMS range",
      style: {
        fontWeight: 500,
      },
    },
    yaxis: {
      tickAmount: 2,
      min: 0, // Ensure y-axis starts from 0
      title: {
        text: "RMS   Unit( mm/s )",
        style: {
          fontWeight: 500,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
  };

  return (
    <React.Fragment>
      {!isLoading ? (
        <ReactApexChart
          dir="ltr"
          options={options}
          series={series}
          type="area"
          height={460}
          className="apex-charts"
        />
      ) : (
        <div
          style={{
            height: "450px",
            display: "flex",
            alignItems: "center",
          }}
          className="flex  items-center justify-content-center "
        >
          <div className="spinner-border text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RmsChart;
