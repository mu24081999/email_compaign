import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Bar = ({ leadsData, mainTitle }) => {
  console.log("🚀 ~ LineChart ~ leadsData:", leadsData?.series);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Leads",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
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
          text: "Emails Report",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  });
  function getMonthNames(monthNumbers) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      Array.isArray(monthNumbers) &&
      monthNumbers?.map((month) => monthNames[month - 1])
    );
  }
  // Update chart data when leadsData changes
  useEffect(() => {
    if (leadsData) {
      setChartData((prevData) => ({
        ...prevData,
        series: [
          {
            name: "Leads",
            data: Array.isArray(leadsData.series) ? leadsData.series : [],
          },
        ],
        options: {
          ...prevData.options,
          xaxis: {
            categories: Array.isArray(leadsData.months)
              ? getMonthNames(leadsData.months)
              : [],
          },
          title: {
            text: mainTitle,
            align: "left",
          },
        },
      }));
    }
  }, [leadsData, mainTitle]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Bar;
