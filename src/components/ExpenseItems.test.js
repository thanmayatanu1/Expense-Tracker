import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseTracker from './ExpenseItems';

describe('ExpenseTracker component', () => {
  // Test case 1: Render the ExpenseTracker component
  it('should render the ExpenseTracker component without any errors', () => {
    render(<ExpenseTracker />);
    // Assert that the component is rendered without any errors
    expect(screen.getByText('Expense Tracker')).toBeInTheDocument();
  });

  // Test case 2: Display initial balance
  it('should display the initial balance correctly', () => {
    render(<ExpenseTracker />);
    // Assert that the initial balance is displayed correctly
    expect(screen.getByText(/Total Expenses:/i)).toHaveTextContent('Total Expenses: $0');
  });

  // Test case 3: Add an expense
  it('should add an expense correctly', () => {
    render(<ExpenseTracker />);
    const amountInput = screen.getByLabelText('Amount:');
    const descriptionInput = screen.getByLabelText('Description:');
    const categorySelect = screen.getByLabelText('Category:');
    const addButton = screen.getByText('Add Expense');

    // Simulate adding an expense
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Expense' } });
    fireEvent.change(categorySelect, { target: { value: 'Food' } });
    fireEvent.click(addButton);

    // Assert that the expense is added correctly
    expect(screen.getByText('Test Expense')).toBeInTheDocument();
  });

  // Add more test cases for the remaining scenarios

});