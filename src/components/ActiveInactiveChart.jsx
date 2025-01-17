import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveInactiveChart = ({ activeCount, inactiveCount }) => {
  const data = {
    labels: ["Active Courses", "Inactive Courses"],
    datasets: [
      {
        data: [activeCount, inactiveCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "30%", margin: "20px auto"}}>
      <h3 style={{margin: "20px auto"}}>Active vs Inactive Courses</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ActiveInactiveChart;


