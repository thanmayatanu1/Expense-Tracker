import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './themeActions';

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const expenses = useSelector(state => state.expenses.expenses);
  const theme = useSelector(state => state.theme);

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

  const handleEditExpense = async (expenseId, updatedExpense) => {
    dispatch({ type: 'EDIT_EXPENSE', payload: { expenseId, updatedExpense } });
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
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
    <div className={`app ${theme}`}>
      {isLoggedIn ? (
        <div>
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
          <h2>Expenses:</h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                Amount: {expense.amount}, Description: {expense.description}, Category: {expense.category}
                <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                <button onClick={() => handleEditExpense(expense.id, expense)}>Edit</button>
              </li>
            ))}
          </ul>
          {totalExpenses > 10000 && <button>Activate Premium</button>}
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleToggleTheme}>Toggle Theme</button>
          <button onClick={downloadExpensesAsCSV}>Download File</button>
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