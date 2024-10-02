import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import { Chart, registerables } from "chart.js";
import '../styles/expenseChart.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

Chart.register(...registerables);

function ExpenseChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expenses",
        data: [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    Axios.get("http://localhost:5000/api/v1/get-expenses")
      .then((response) => {
        const expenses = response.data;

        // Ensure expenses is an array
        if (Array.isArray(expenses)) {

          const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

          const dates = sortedExpenses.map((expense) =>
            new Date(expense.date).toLocaleDateString("en-GB")
          );
          const amounts = sortedExpenses.map((expense) => expense.amount);

          setChartData({
            labels: dates,
            datasets: [
              {
                label: "Expenses",
                data: amounts,
                backgroundColor: "rgba(255,255,255,0.6)",
                borderColor: "rgba(255,255,255,1)",
                fill: false,
                tension: 0.1,
              },
            ],
          });
        } else {
          console.error("Expected an array of expenses");
        }
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  }, []);

  return (
    <div className="lineTab">
      <h3>Day-to-Day Expenses</h3>
      <div className="lineGraph">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default ExpenseChart;
