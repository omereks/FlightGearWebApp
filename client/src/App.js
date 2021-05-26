import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Models from './components/models/Models';
import DropBoxCSV from './components/DropBoxCSV';
import AnomalyResult from './components/anomalyData';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        AnomalyArr: ["no"]
    }
    
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className>WebApp</h1>
          <div className="wrapApp">
            <div className="dropBox">
              <DropBoxCSV getAnomalyArr={(arr)=>{
                this.setState({AnomalyArr: arr})
              }}></DropBoxCSV>
            </div>
            <div className="AnomalyResult">
              <AnomalyResult AnomalyArr={this.state.AnomalyArr}></AnomalyResult>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
