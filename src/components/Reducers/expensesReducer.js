const initialState = {
    expenses: [],
};

const expensesReducer = (state = initialState, action) => {
     // Handle different actions and update the state accordingly
     switch(action.type)
     {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
    
            };
            case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
      case 'EDIT_EXPENSE':
  const { expenseId, updatedExpense } = action.payload;
  return {
    ...state,
    expenses: state.expenses.map((expense) => {
      if (expense.id === expenseId) {
        return {
          ...expense,
          ...updatedExpense,
        };
      }
      return expense;
    }),
  };
        
      default:
        return state;
    }
  };
  

export default expensesReducer;

    