import './App.css';
import Clock from './clock';
import Countdown from './countdown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <hr />
        <Countdown />
      </header>
    </div>
  );
}

export default App;
