import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Axios from "axios";
import '../styles/pieChart.css'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: "right",  // Move labels to the right
    },
  },
};

function PieChart() {
  const [pieChartData, setPieChartData] = useState({
    labels: [
      "Food",
      "Shopping",
      "Entertainment",
      "Education",
      "tax",
      "Miscellaneous",
    ],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#5AC12F",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#5AC12F",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    Axios.get("http://localhost:5000/api/v1/get-expenses")
      .then((response) => {
        const expenses = response.data;

        // Calculate category counts
        const categoryCounts = expenses.reduce((acc, expense) => {
          const category = expense.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        // Update chart data using the categories and their counts
        setPieChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [
                categoryCounts["food"] || 0,
                categoryCounts["shopping"] || 0,
                categoryCounts["entertainment"] || 0,
                categoryCounts["education"] || 0,
                categoryCounts["tax"] || 0,
                categoryCounts["miscellaneous"] || 0,
              ],
            },
          ],
        }));
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  }, []);

  return (
    <div className="pieTab">
      <h2>Expense Categories Breakdown</h2>
      <div className="pieChart">
        <Pie data={pieChartData} options={options} />
      </div>
    </div>
  );
}

export default PieChart;
