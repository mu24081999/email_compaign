import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ emailData, mainTitle, sideTitle }) => {
  console.log("🚀 ~ LineChart ~ emailData:", emailData?.series);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sent",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: mainTitle,
        align: "left",
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: sideTitle,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  });

  // Update chart data when emailData changes
  useEffect(() => {
    if (emailData) {
      setChartData((prevData) => ({
        ...prevData,
        series: [
          {
            name: "Sent",
            data: Array.isArray(emailData.series) ? emailData.series : [],
          },
        ],
        options: {
          ...prevData.options,
          xaxis: {
            categories: Array.isArray(emailData.months) ? emailData.months : [],
          },
        },
      }));
    }
  }, [emailData, mainTitle, sideTitle]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default LineChart;
