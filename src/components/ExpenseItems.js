import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenses, setExpenses] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      amount: amount,
      description: description,
      category: category,
    };

    setExpenses([...expenses, newExpense]);

    setAmount('');
    setDescription('');
    setCategory('Food');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Expense Tracker</h1>
          <form onSubmit={handleExpenseSubmit}>
            <label>
              Amount:
              <input type="number" value={amount} onChange={handleAmountChange} required />
            </label>
            <br />
            <label>
              Description:
              <input type="text" value={description} onChange={handleDescriptionChange} required />
            </label>
            <br />
            <label>
              Category:
              <select value={category} onChange={handleCategoryChange}>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
            </label>
            <br />
            <button type="submit">Add Expense</button>
          </form>
          <h2>Expenses:</h2>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                Amount: {expense.amount}, Description: {expense.description}, Category: {expense.category}
              </li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;