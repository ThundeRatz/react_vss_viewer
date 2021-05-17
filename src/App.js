import logo from './logo.svg';
import './App.css';
import './FieldCanvas/FieldCanvas.js'
import FieldCanvas from './FieldCanvas/FieldCanvas.js';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <FieldCanvas />
    </Provider>
  );
}

export default App;
