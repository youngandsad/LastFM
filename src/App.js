import './App.css';
import Cards from './Cards.js'

import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
            <Cards />
        </header>
      </div>
    </Provider>
  );
}

export default App;
