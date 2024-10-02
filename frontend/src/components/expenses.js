import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/expenses.css";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
  const [error, setError] = useState(null);

  // Filters
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Current month as default
  const [selectedCategory, setSelectedCategory] = useState(""); // Default empty for 'All categories'

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/api/v1/get-expenses"
        );
        const expensesData = response.data;

        // Update state with expenses
        setExpenses(expensesData);
        setLoading(false);

        // Sum for the default (current) month
        calculateTotalMonthlyExpense(
          expensesData,
          selectedMonth,
          selectedCategory
        );
      } catch (err) {
        console.error("Error fetching expenses: ", err);
        setError("Failed to fetch expenses. Please try again later.");
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const calculateTotalMonthlyExpense = (expenses, month, category) => {
    const currentYear = new Date().getFullYear();
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const matchesMonth =
        expenseDate.getMonth() === month &&
        expenseDate.getFullYear() === currentYear;
      const matchesCategory = category ? expense.category === category : true;
      return matchesMonth && matchesCategory;
    });

    const total = filteredExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    setTotalMonthlyExpense(total);
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    calculateTotalMonthlyExpense(expenses, month, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    calculateTotalMonthlyExpense(expenses, selectedMonth, category);
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      Axios.delete(`http://localhost:5000/api/v1/delete-expense/${id}`)
        .then(() => {
          setExpenses(expenses.filter((expense) => expense._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting expense:", error);
        });
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedMonth(new Date().getMonth());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="expenses-container">
      <h2>Recent Expenses</h2>
      <h3>Total Expenses for Selected Month: ₹{totalMonthlyExpense}</h3>

      {/* Filters */}
      <div className="filters">
        <select className="select" value={selectedMonth} onChange={handleMonthChange}>
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>

        <select className="select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" disabled>
            Select category
          </option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="education">Education</option>
          <option value="tax">Tax</option>
          <option value="miscellaneous">Miscellaneous</option>
          {/* Add more categories as needed */}
        </select>

        <button className="reset" onClick={handleReset}>Reset</button>


      </div>

      <table className="expenses-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .filter((expense) => {
              const expenseDate = new Date(expense.date);
              const matchesMonth = expenseDate.getMonth() === selectedMonth;
              const matchesCategory = selectedCategory
                ? expense.category === selectedCategory
                : true;
              return matchesMonth && matchesCategory;
            })
            .map((expense) => (
              <tr key={expense._id}>
                <td>{expense.name}</td>
                <td>{expense.amount} &#8377;</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>
                  <div>
                    {new Date(expense.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "lighter",
                      color: "#aaa",
                    }}
                  >
                    {new Date(expense.createdAt).toLocaleTimeString("en-GB", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;
