import React, { useEffect, useState, useMemo, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";
import moment from "moment";
import {
  TEMPERATURE_DANGER_THRESHOLD,
  TEMPERATURE_WARNING_THRESHOLD,
} from "../../common/config";

const formatData = (history, type, path) => {
  const formattedData = history.map((dataPoint) => ({
    x: dataPoint.ts,
    y: parseFloat(dataPoint.vibration[path][type]).toFixed(2),
  }));

  // Sorting data by timestamp
  formattedData.sort((a, b) => a.x - b.x);

  return formattedData;
};

export const DisplacementChart = ({
  isLoading,
  history,
  dataColors,
  selectedAxis,
}) => {
  const displacementColors = getChartColorsArray(dataColors);

  const getSeriesData = useCallback(
    (type) => formatData(history, type, "displacement"),
    [history]
  );

  const axisSeries = useMemo(() => {
    return selectedAxis.map((ax) => {
      const colorMap = { x: "#FF5733", y: "#33FF57", z: "#3357FF" };
      return {
        name: `${ax}Axis`,
        data: getSeriesData(ax),
        color: colorMap[ax],
      };
    });
  }, [selectedAxis, getSeriesData]);

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 500,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    colors: displacementColors,
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Displacement range",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      showAlways: true,
      min: 0, // Ensure y-axis starts from 0
      labels: {
        show: true,
        formatter: (value) => Math.round(value),
      },
      title: {
        text: "Displacement Unit( um )",
        style: {
          fontWeight: 500,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => `${val.toFixed(1)} um`,
      },
      x: {
        formatter: (val) => {
          const date = new Date(val);
          const month = date.toLocaleString("default", { month: "short" });
          const day = date.getDate();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return `${day} ${month} ${hour}:${minutes}`;
        },
      },
    },
  };

  return (
    <React.Fragment>
      {!isLoading ? (
        <ReactApexChart
          dir="ltr"
          options={options}
          series={axisSeries}
          type="area"
          height={450}
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

export const SpeedChart = ({
  isLoading,
  history,
  dataColors,
  selectedAxis,
}) => {
  const getSeriesData = useCallback(
    (type) => formatData(history, type, "speed"),
    [history]
  );

  const axisSeries = useMemo(() => {
    return selectedAxis.map((ax) => {
      const colorMap = { x: "#FF5733", y: "#33FF57", z: "#3357FF" };
      return {
        name: `${ax}Axis`,
        data: getSeriesData(ax),
        color: colorMap[ax],
      };
    });
  }, [selectedAxis, getSeriesData]);

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 500,
      zoom: {
        type: "x",
        enabled: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Speed range",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      showAlways: true,
      min: 0, // Ensure y-axis starts from 0
      labels: {
        formatter: (value) => parseFloat(value).toFixed(1),
      },
      title: {
        text: "Speed Unit( mm/s )",
        style: {
          fontWeight: 500,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => `${parseFloat(val).toFixed(2)} mm/s`,
      },
      x: {
        formatter: (val) => {
          const date = new Date(val);
          const month = date.toLocaleString("default", { month: "short" });
          const day = date.getDate();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return `${day} ${month} ${hour}:${minutes}`;
        },
      },
    },
  };

  return (
    <React.Fragment>
      {!isLoading ? (
        <ReactApexChart
          dir="ltr"
          options={options}
          series={axisSeries}
          type="area"
          height={450}
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

export const TempChart = ({ isLoading, history }) => {
  const [seriesData, setSeriesData] = useState([]);
  const [chartColor, setChartColor] = useState("#FF5733");

  useEffect(() => {
    if (history.length > 0) {
      const formattedData = history.map((dataPoint) => ({
        x: dataPoint.ts,
        y: parseFloat(dataPoint.vibration.temperature).toFixed(1),
      }));

      // Sorting data by timestamp
      formattedData.sort((a, b) => a.x - b.x);
      setSeriesData(formattedData);

      let latestVal = formattedData[formattedData.length - 1];
      if (parseFloat(latestVal?.y || 0) >= TEMPERATURE_DANGER_THRESHOLD) {
        setChartColor("#FF5733");
      } else if (
        parseFloat(latestVal?.y || 0) >= TEMPERATURE_WARNING_THRESHOLD
      ) {
        setChartColor("#f1963b");
      } else {
        setChartColor("#33FF57");
      }
    }
  }, [history]);

  const series = [
    {
      name: "temperature",
      data: seriesData,
      color: chartColor,
    },
  ];
  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 500,
      zoom: {
        type: "x",
        enabled: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Speed range",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      showAlways: true,
      min: 0, // Ensure y-axis starts from 0
      labels: {
        show: true,
        formatter: (value) => Math.round(value),
      },
      title: {
        text: "Speed Unit",
        style: {
          fontWeight: 500,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val) => `${val.toFixed(1)} C`,
      },
      x: {
        formatter: (val) => {
          const date = new Date(val);
          const month = date.toLocaleString("default", { month: "short" });
          const day = date.getDate();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return `${day} ${month} ${hour}:${minutes}`;
        },
      },
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
          height={450}
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
