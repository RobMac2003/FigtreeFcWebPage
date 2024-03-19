import logo from './logo.svg';
import './App.css';
import MyComponent from './dataFetch'; // Make sure to adjust the path to where your MyComponent is located
import ScrollableList from "./components/displayData";
import FilterBar from './components/FilterBar';
function App() {
  return (

      <div className="App">

        <header className="App-header">
            <FilterBar />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>


            <div> <ScrollableList/></div>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            test
          </a>
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
