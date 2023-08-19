

import './App.css';
import AuthForm from './components/AuthForm';
import store from './components/store';



import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <AuthForm />
    </Provider>
  );
};

export default App;
