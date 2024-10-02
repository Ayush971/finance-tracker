import React, { useState } from "react";
import '../styles/categories.css'
import Axios from 'axios'
import { IoFastFood, IoSchoolSharp } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";
import { HiReceiptTax } from "react-icons/hi";
import { FaShoppingBasket } from "react-icons/fa";

function Categories() {
  const [categories, setCategories] = useState([0, 0, 0, 0, 0, 0]);
  Axios.get("http://localhost:5000/api/v1/get-expenses")
    .then((response) => {
      const expenses = response.data;

      // Calculate category counts
      const categoryCounts = expenses.reduce((acc, expense) => {
        const category = expense.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      setCategories([
        categoryCounts["food"] || 0,
        categoryCounts["shopping"] || 0,
        categoryCounts["entertainment"] || 0,
        categoryCounts["education"] || 0,
        categoryCounts["tax"] || 0,
        categoryCounts["miscellaneous"] || 0,
      ]);
    })
    .catch((error) => {
      console.error("Error fetching expense data:", error);
    });

  return (
    <div className="tasks">
      <h3>Categories</h3>
      <hr />
      <table>
        <tbody>
          <tr>
            <td>
              <IoFastFood/>
            </td>
            <td>Food</td>
            <td>{categories[0]}</td>
          </tr>
          <tr>
            <td><FaBagShopping/></td>
            <td>Shopping</td>
            <td>{categories[1]}</td>
          </tr>
          <tr>
            <td><BiMoviePlay/></td>
            <td>Entertainment</td>
            <td>{categories[2]}</td>
          </tr>
          <tr>
            <td><IoSchoolSharp/></td>
            <td>Education</td>
            <td>{categories[3]}</td>
          </tr>
          <tr>
            <td><HiReceiptTax/></td>
            <td>tax</td>
            <td>{categories[4]}</td>
          </tr>
          <tr>
            <td><FaShoppingBasket/></td>
            <td>Miscellaneous</td>
            <td>{categories[5]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
