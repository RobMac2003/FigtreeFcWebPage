import logo from './logo.svg';
import './App.css';
import MyComponent from './dataFetch';
import ScrollableList from "./components/displayData";
import FilterBar from './components/FilterBar';
import CustomDatePicker from './components/datePicker';
function App() {
  return (
      <div className="App">
        <header className="App-header">
            <CustomDatePicker/>
            <FilterBar />
            <div> <ScrollableList/></div>
        </header>
      </div>
  );
}

export default App;
