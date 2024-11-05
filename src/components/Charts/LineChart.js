import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sales",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
        text: "Product Sales Over Time",
        align: "left",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        title: {
          text: "Sales (in thousands)",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
      <ReactApexChart
        options={{ ...chartData.options, chart: { type: "bar" } }}
        series={chartData.series}
        type="bar"
        height={350}
      />
      <ReactApexChart
        options={{ ...chartData.options, chart: { type: "pie" } }}
        series={[44, 55, 41, 17, 15]} // Pie charts use single series array
        type="pie"
        height={350}
      />
    </div>
  );
};

export default LineChart;
