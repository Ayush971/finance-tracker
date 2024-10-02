import Axios from 'axios'
import React, { useState } from "react";
import '../styles/recentExpenses.css'

function RecentExpenses() {
  const [expenses, setExpenses] = useState([]);

  Axios.get("http://localhost:5000/api/v1/get-expenses")
    .then((response) => {
      const allExpenses = response.data;
      const recentExpenses = allExpenses.slice(-5);
      setExpenses(recentExpenses);
    })
    .catch((error) => {
      console.error("Error fetching expenses:", error);
    });

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className="recent-expenses">
      <h3>Recent Expenses</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              {" "}
              {/* Assuming each expense has a unique _id */}
              <td>{expense.name}</td>
              <td>{expense.amount} &#8377;</td>
              <td>{expense.category}</td>
              <td>{truncateText(expense.description, 3)}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentExpenses;
