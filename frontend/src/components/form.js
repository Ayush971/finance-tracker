import React, { useState } from "react";
import '../styles/form.css';
import Axios from 'axios'

function Form({show, handleClose}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);  // For showing success message

  if (!show) return null; // Only render if show is true

  const handleSubmit = (e)=>{
    e.preventDefault()
    Axios.post('http://localhost:5000/api/v1/add-expense',{
      name,
      amount,
      category,
      description,
      date
    }).then(response=>{
      console.log(response)
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleClose();    // Close form after a brief moment
      }, 2000);           // Show the success message for 2 seconds
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="container">
      <div className="form-box">
        <h2>New Expense</h2>
        {success && <p className="success-message">Data saved successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="items">
          <label>Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="items">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="items">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="write description here"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="items">
          <label>Category</label>
          <select
            name="category"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select category</option> 
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="education">Education</option>
            <option value="tax">Tax</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div className="items">
          <label>Date</label>
          <input
            type="date"
            name="date"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClose}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Form;
