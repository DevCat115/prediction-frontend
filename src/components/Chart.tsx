import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";
import { SocketContext } from "../hooks/SocketProvider";

const Chart = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [chartDate, setDate] = useState([]);
  const [height, setHeight] = useState(260);
  useEffect(() => {
    if (isMobile) {
      setHeight(200);
    } else {
      setHeight(260);
    }
  }, [isMobile]);
  const { btcList } = useContext(SocketContext);

  const chartOptions = {
    // Define your chart options here
    chart: {
      height: height,
      type: "line" as const,
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 1,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#333"],
      },
      offsetX: 30,
    },
    stroke: {
      curve: "smooth" as const,
    },
    markers: {
      size: 1,
    },
    yaxis: {
      labels: {
        show: false,
        align: "left" as const,
      },
      tickAmount: 30,
    },
    xaxis: {
      categories: chartDate,
      max: 300,
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    // legend: {
    //   position: "top" as const,
    //   horizontalAlign: "right" as const,
    //   floating: true,
    //   offsetY: -25,
    //   offsetX: -5,
    // },
    grid: {
      borderColor: "#182b48",
      row: {
        colors: ["#182b48", "#182b48"], // takes an array which will be repeated on columns
        opacity: 0.4,
      },
    },
    series: [
      {
        name: "Matic Value",
        data: btcList,
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={height}
      />
    </div>
  );
};

export default Chart;
