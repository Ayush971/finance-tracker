const express = require("express");
const { expense } = require("../models/expense");
const { Parser } = require('json2csv');
const router = express.Router();

router.post("/add-expense", async (req, res) => {
  const { name, amount, category, description, date } = req.body;
  console.log(req.body);
  const newExpense = new expense({
    name,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!name || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields required" });
    } else if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "amount should be a positive integer" });
    }
    await newExpense.save();
    return res.status(200).json({ message: "record saved" });
  } catch (error) {
    res.status(500).json({ messgae: "Server Error" });
  }
});

router.get('/generate-report', async (req,res) => {
  const {month,days} = req.query;
  try {
    let expenses;

    if (month) {
      const [year, monthIndex] = month.split('-');
      expenses = await expense.find({
        date: {
          $gte: new Date(year, monthIndex - 1, 1),
          $lt: new Date(year, monthIndex, 1),
        },
      });
    } else if (days) {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - parseInt(days, 10));
      expenses = await expense.find({
        date: {
          $gte: fromDate,
        },
      });
    } else {
      return res.status(400).json({ message: 'Please provide a valid month or number of days' });
    }

    const fields = ['name', 'amount', 'category', 'description', 'date'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(expenses);

    res.header('Content-Type', 'text/csv');
    res.attachment('Expense_Report.csv');
    res.send(csv);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).send('Internal Server Error');
  }
})

router.get("/get-expenses", async (req, res) => {
  try {
    const expenses = await expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Sevrer Error" });
  }
});

router.delete('/delete-expense/:id', async (req,res) => {
  const {id} = req.params
  expense.findByIdAndDelete(id)
    .then((income)=>{
      res.status(200).json({message:'expense deleted'})
    })
    .catch((error)=>{
      res.status(500).json({message:'server error'})
    })
})

module.exports = { UserRouter: router };
