import React, { Component } from 'react';
import './DropBoxCsv.css';
import { parase } from "papaparse";
import Toggle from "react-toggle";
import "react-toggle/style.css";





class DropBoxCSV extends Component{
    constructor(props) {
        super(props);
        this.state = {
            highlighted: false,
            isLearnMode: false,
            isHybrid: true,
            text: [],
            modelTrainID: 0
        }
        
    }
    
    componentDidMount() {

    }

    sendCSV() {
        if(this.state.isLearnMode){
            fetch(`http://localhost:9876/api/model?model_type=${this.state.isHybrid? 'hybrid': 'regression'}`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.text) //sending json each array is a row in csv file
            })
        }
        else{
            
            fetch(`http://localhost:9876/api/anomaly?model_id=${this.state.modelTrainID}`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // need to apply
                firstParam: `zdf`,
                secondParam: 'yourOtherValue',
                })
            })
            console.log("detect")
        }
    }

    
    render() {
        return (
            <div>
                <h3>Drop Zone CSV File</h3>

                {/* Toggle Detect / Learn */}
                <div className="ToggleDiv">
                    <div className="firstToggle">
                        <span className="span-left">detect</span>
                        <Toggle
                            
                            defaultChecked={this.state.isLearnMode}
                            icons={false}
                            onChange={(toggle) => {
                                this.setState({isLearnMode: !this.state.isLearnMode});
                                //this.state.isLearnMode ? document.getElementById("secondToggle").style.display="none" : document.getElementById("secondToggle").style.display="block"; 
                            }} />
                        <span className="span-right">learn</span>
                    </div>
                    <div className="secondToggle">
                        <span className="span-left">Hybrid</span>
                        <Toggle 
                            className="Toggle"
                            disabled={!this.state.isLearnMode}
                            defaultChecked={!this.state.isHybrid}
                            icons={false}
                            onChange={(toggle) => this.setState({isHybrid: !this.state.isHybrid})}
                            />
                        <span className="span-right">Regression</span>
                    </div>
                </div>
                {/* Drop Zone */}
                <div className={this.state.highlighted? "drop-box-highlighted" :"drop-box"} 
                onDragEnter={() => {this.setState({highlighted: true})}}
                onDragLeave={() => {this.setState({highlighted: false})}}
                //on drag file to box
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}

                //on drop file her
                onDrop={(e)=> {
                    this.setState({highlighted: false});
                    e.preventDefault();
                    e.stopPropagation();
                    var that = this;

                    // For windows
                    Array.from(e.dataTransfer.files) 
                    .filter((file) => file.type ===  "application/vnd.ms-excel")
                    .forEach( async (file) => {
                        const fileReader = new FileReader();
                        fileReader.readAsText(file);
                        fileReader.onload = function() {
                            const dataset = fileReader.result;
                            const result = dataset.split('\r\n').map(data => data.split(','));

                            that.setState({text: result}, () => {
                                that.sendCSV();
                                //console.log(that.state.text)
                            })
                        };
                    });

                    //For linux
                    Array.from(e.dataTransfer.files) 
                    .filter((file) => file.type === "text/csv")
                    .forEach( async (file) => {
                        const text = await file.text();
                        const result = parase(test);
                        that.setState({text: result}, () => {
                                that.sendCSV();
                                //console.log(that.state.text)
                            });
                        //console.log(result);
                    });
                }
                }
                >Drop Here
                </div>
            </div>
          );
    }
}
export default DropBoxCSV;
