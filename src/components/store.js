import { createStore, combineReducers } from 'redux';

// Import your reducers

import expensesReducer from './Reducers/expensesReducer';


// Combine the reducers
const rootReducer = combineReducers({
 
  expenses: expensesReducer,
  
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;