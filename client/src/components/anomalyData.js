import React, { Component } from 'react';
import './anomalyData.css';




class AnomalyResult extends Component {

    constructor(props) {
        super(props)
        // this.updateanomaly = this.updateanomaly.bind(this);
        this.state = {
            // anomalyData: [[123, "aclkm - sdfaf"], [123, "A - F"]],
            // status: "Table"
            anomalyData: props.AnomalyArr,
            status: "Enter File"
        };
    }

    componentWillReceiveProps(newProps){
        //this.setState({ anomalyData: [[123, "aclkm - sdfaf"], [123, "A - F"]]})
        if(this.state.anomalyData.length == 0)
            this.setState({status: "No Anomalies"})
        else
            this.setState({status: "Table"})
        this.forceUpdate();
        // this.updateanomaly(newProps.AnomalyArr)
    }

    // // to this function pass the array that came from the server the function update the table
    // updateanomaly(anomaly) {
    //     let i = 0;
    //     let copy = this.state.anomalyData.slice();
    //     for (;i < anomaly.length; i++){
    //         copy.push({
    //                     key: i,
    //                     feturesName: anomaly[i][1],
    //                     row: anomaly[i][0]
    //                 })
    //     }
    //     this.setState({ anomalyData:copy });
    // }

    render() {
        let anom = [[123, "aclkm - sdfaf"], [123, "A - F"]]; // test array delete this and the button at the end
        // when click the button the updateanomaly start with the anom array, its only for easy testing to know that the array added dynamically
        return (
            <div>
                <h3>{this.state.status}</h3>
                {this.state.status == "Table"? 
                <div>
                <table>
                    <tr>
                        <th>Features</th>
                        <th>Row</th>
                    </tr>
                    { this.state.anomalyData.map(row => (
                    <tr>
                        <td>
                        {row[0]}
                        </td>
                        <td>
                        {row[1]}
                        </td>
                    </tr>))}
                </table>
                </div>
                : ""}
            </div>
        );
    }
        
        
        // return (
        //     <div>
                
                
                
        //         <button onClick={() => this.updateanomaly(anom)}>click</button> 
        //         {this.anomalyState()}
        //     </div>
        // );
            
    
  
    // design the table
    // anomalyState() {
    //     if (!this.state.anomalyData.length) return <h3>No anomaly Detected</h3>
    //     return (
    //         <table style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', }}>
    //             <tr style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', "borderCollapse": "collapse" }}>
    //                 <th style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', "fontSize": "18px" }}>Features</th>
    //                 <th style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', "fontSize": "18px" }}>Row</th>
    //             </tr>
    //             { this.state.anomalyData.map(d => (
    //                 <tr>
    //                     <td style={{
    //                         "borderBottomWidth": "1px", "borderBottom": "dashed", "fontSize": "13px","borderWidth": "1px"
    //                     }}>{d.feturesName}
    //                     </td>
    //                     <td style={{ "borderBottomWidth": "1px", "borderBottom": "dashed", "fontSize": "13px","borderWidth": "1px"  }}>{d.row}</td>
    //                 </tr>))}
    //             </table>
    //     );
    // }
}  
export default AnomalyResult;