import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ExpenseTracker from './ExpenseTracker';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('ExpenseTracker', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        expenses: {
          expenses: [
            { id: '1', amount: 10, description: 'Expense 1', category: 'Food' },
            { id: '2', amount: 20, description: 'Expense 2', category: 'Transportation' },
          ],
        },
      })
    );
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  test('renders without errors', () => {
    render(<ExpenseTracker loggedInEmail="test@example.com" />);
    // Assertion
  });

  test('displays the correct number of expense items', () => {
    render(<ExpenseTracker loggedInEmail="test@example.com" />);
    // Assertion to verify that the table renders the correct number of rows
  });

  test('adding a new expense triggers the correct API call', async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const { getByLabelText, getByText } = render(<ExpenseTracker loggedInEmail="test@example.com" />);
    const amountInput = getByLabelText('Amount:');
    const descriptionInput = getByLabelText('Description:');
    const categorySelect = getByLabelText('Category:');
    const addButton = getByText('Add Expense');

    fireEvent.change(amountInput, { target: { value: '30' } });
    fireEvent.change(descriptionInput, { target: { value: 'Expense 3' } });
    fireEvent.change(categorySelect, { target: { value: 'Food' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      // Assertion to verify that the dispatch is called with the correct payload
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'ADD_EXPENSE',
        payload: {
          id: expect.any(String),
          amount: 30,
          description: 'Expense 3',
          category: 'Food',
        },
      });
    });
  });

  test('deleting an expense triggers the correct API call', async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const { getByText } = render(<ExpenseTracker loggedInEmail="test@example.com" />);
    const deleteButton = getByText('Delete');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      // Assertion to verify that the dispatch is called with the correct payload
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'DELETE_EXPENSE',
        payload: '1', // Replace with the correct expense ID
      });
    });
  });

  test('editing an expense triggers the correct API call', async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const { getByText } = render(<ExpenseTracker loggedInEmail="test@example.com" />);
    const editButton = getByText('Edit');

    fireEvent.click(editButton);

    await waitFor(() => {
      // Assertion to verify that the dispatch is called with the correct payload
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'EDIT_EXPENSE',
        payload: { id: '1', amount: 10, description: 'Updated Expense 1', category: 'Food' }, // Replace with the correct expense details
      });
    });
  });
});