import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Bar = ({ leadsData, mainTitle }) => {
  console.log("🚀 ~ LineChart ~ leadsData:", leadsData?.series);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sent",
        // data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        data: Array.isArray(leadsData?.series) ? leadsData?.series : [],
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
        categories: Array.isArray(leadsData?.months) ? leadsData?.months : [],
        // categories: [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        // ],
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

  return (
    <div id="chart">
      <ReactApexChart
        options={{ ...chartData.options, chart: { type: "bar" } }}
        series={chartData.series}
        type="bar"
        height={350}
      />
      {/* <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      /> */}
      {/* <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-100 rounded-lg shadow-lg lg:col-span-2">
          <ReactApexChart
            options={{ ...chartData.options, chart: { type: "bar" } }}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-100 rounded-lg shadow-lg">
          <div>
            <ReactApexChart
              options={{ ...chartData.options, chart: { type: "pie" } }}
              series={[44, 55, 41, 17, 15]} // Pie charts use single series array
              type="pie"
              height={350}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Bar;
