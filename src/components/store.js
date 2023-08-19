import { createStore, combineReducers } from 'redux';

// Import your reducers
import authReducer from './Reducers/authReducer';
import expensesReducer from './Reducers/expensesReducer';

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;