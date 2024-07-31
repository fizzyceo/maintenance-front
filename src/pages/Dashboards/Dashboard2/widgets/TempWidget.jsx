import React from "react";
import {
  TEMPERATURE_DANGER_THRESHOLD,
  TEMPERATURE_WARNING_THRESHOLD,
} from "../../../../common/config";

const TempWidget = ({ tempData, latestTemp, isOffline }) => {
  function getColorBasedOnTemp(temp) {
    if (temp !== "--") {
      if (temp >= TEMPERATURE_DANGER_THRESHOLD) {
        return "danger";
      } else if (temp >= TEMPERATURE_WARNING_THRESHOLD) {
        return "warning";
      } else {
        return "success";
      }
    }
  }

  const tempWidget = {
    id: 1,
    lable: "Application",
    icon: "ri-arrow-up-line ",
    badgeColor: "success",
    chartColor: `["--vz-${getColorBasedOnTemp(
      latestTemp
    )}" , "--vz-transparent"]`,
    number: "16.24 %",
    series: [
      {
        name: "",
        data: tempData || [0, 0, 0],
      },
    ],
  };
  return (
    <Card className="card ">
      <div className="d-flex">
        <div className="flex-grow-1  p-3">
          <h5 className="mb-3">Temperature</h5>
          <h1 className="mb-0 text-muted">
            <span className={`   text-${getColorBasedOnTemp(latestTemp || 0)}`}>
              {!isOffline ? latestTemp || 0 : "--"} C
            </span>
          </h1>
        </div>
        <div>
          <TempChart
            seriesData={tempWidget.series}
            dataColors={tempWidget.chartColor}
          />
        </div>
      </div>
    </Card>
  );
};

export default TempWidget;
