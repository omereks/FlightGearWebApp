import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Models from './components/models/Models';
import DropBoxCSV from './components/DropBoxCSV';
import AnomalyResult from './components/anomalyData';


class App extends Component{
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload............
          </p>
          <DropBoxCSV></DropBoxCSV>
          <AnomalyResult></AnomalyResult>
          <Models></Models>
        </header>
      </div>
    );
  }
}

export default App;
