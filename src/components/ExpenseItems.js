import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import './LightTheme.css';
import './DarkTheme.css';
import React, { useEffect, useState } from 'react';
import classes from './ExpenseItems.module.css';


const ExpenseTracker = () => {
  const [theme, setTheme] = useState('light');
  const [isPremiumActivated, setIsPremiumActivated] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      setTheme('light');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  };

  useEffect(() => {
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);



  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const expenses = useSelector(state => state.expenses.expenses);


  const handleLogin = () => {
    dispatch({ type: 'LOGIN', payload: { token: 'your-token-value', userId: 'your-user-id' } });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();

    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    const newExpense = {
      id: uuidv4(), // Generate a unique ID
      amount,
      description,
      category,
    };

    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });

    e.target.reset();
  };

  const handleDeleteExpense = async (expenseId) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: expenseId });
  };

  const handleEditExpense = (expenseId) => {
    dispatch({ type: 'DELETE_EXPENSE', payload:  expenseId  });
  };
  

  const downloadExpensesAsCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + expenses.map(expense => Object.values(expense).join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "expenses.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className={classes.expensetracker} >
      {isLoggedIn ? (
        <div className={classes.formgroup}>
          <h1>Expense Tracker</h1>
          <form onSubmit={handleExpenseSubmit}>
            <label>
              Amount:
              <input type="number" name="amount" required />
            </label>
            <br />
            <label>
              Description:
              <input type="text" name="description" required />
            </label>
            <br />
            <label>
              Category:
              <select name="category" required>
                <option value="Food">Food</option>
                <option value="Pet">Pet</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </label>
            <br />
            <button type="submit">Add Expense</button>
          </form>
          
          <h3>Expenses:</h3>
          <table className={classes.expensesTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button className={classes.deleteButton} onClick={() => handleDeleteExpense(expense.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button className={classes.editButton} onClick={() => handleEditExpense(expense.id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalExpenses > 10000 && 
          <button className = {classes.togglebutton} onClick={() => setIsPremiumActivated(true)}>Activate Premium</button>}
          <button className = {classes.closebutton} onClick={handleLogout}>Close</button>
          {isPremiumActivated && (
          <button className = {classes.togglebutton} onClick={toggleTheme}>Toggle Theme</button>
          )}
          <button className = {classes.downloadbutton} onClick={downloadExpensesAsCSV}>Download File</button>
        </div>
      ) : (
        <div >
          <h1 className={classes.addexpense} onClick={handleLogin}> Click Here To Add Expense</h1>
          
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;