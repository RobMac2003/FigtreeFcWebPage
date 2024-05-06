import logo from './logo.svg';
import './App.css';
import MyComponent from './dataFetch';
import ScrollableList from "./components/displayData";
import FilterBar from './components/FilterBar';
function App() {
  return (
      <div className="App">
        <header className="App-header">
            <FilterBar />
            <div> <ScrollableList/></div>
        </header>
      </div>
  );
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code> test src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
