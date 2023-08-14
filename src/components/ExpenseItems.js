import React, { useState, useEffect } from 'react';

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

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      amount: amount,
      description: description,
      category: category,
    };

    //to post request inorder to store the data at the backend firebase
    try {
      const response = await
      fetch("https://expense-tracker-165fb-default-rtdb.firebaseio.com/expenses.json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if(!response.ok)
      {
        throw new Error('failed to add expense');
      }
    

    

    setExpenses([...expenses, newExpense]);
    setAmount('');
    setDescription('');
    setCategory('Food');
  } catch (error) {
    console.error(error);
  }
};

//to retrieve data we use the useEffect to get the data saved in firebase after post 

useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('https://expense-tracker-165fb-default-rtdb.firebaseio.com/expenses.json');

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();

        if (data) {
          const fetchedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setExpenses(fetchedExpenses);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);

  //delete expense When the user clicks on it, make a DELETE request and remove the expense from the database.

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`https://expense-tracker-165fb-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      setExpenses(expenses.filter((expense) => expense.id !== expenseId));
      console.log('Expense successfully deleted');
    } catch (error) {
      console.error(error);
    }
  };

  //edit/update  When the user clicks on the Edit button, the user should be able to edit all the expenses
  //Once he is done Editing and clicks on Submit , do a PUT request and update the values.

  const handleEditExpense = async (expenseId, updatedExpense) => {
  try {
    const response = await fetch(`https://expense-tracker-165fb-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpense),
    });

    if (!response.ok) {
      throw new Error('Failed to update expense');
    }

    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === expenseId) {
        return { ...expense, ...updatedExpense };
      }
      return expense;
    });

    setExpenses(updatedExpenses);
    console.log('Expense successfully updated');
  } catch (error) {
    console.error(error);
  }
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
          {expenses.map((expense) => (
            <li key={expense.id}>
              Amount: {expense.amount}, Description: {expense.description}, Category: {expense.category}
              <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
              <button onClick={() => handleEditExpense(expense.id)}>Edit</button>
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