import React, { Component } from 'react';
import './Models.css';


function func(params) {
    console.log("func");

    fetch('http://localhost:9876/api/model', {
        method: 'POSTZZZZZZZ',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: `${params}`,
          secondParam: 'yourOtherValue',
        })
      })
}


class Models extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modelss: []
        }
        
    }
    
    componentDidMount() {
        //let self = this;

        fetch('http://localhost:9876/api/models')
            .then((res) =>  res.json())
            .then((data) => this.setState({modelss: data}));
    }

    

    render() {
        console.log("asdzsd")

        return (
            <div>
                <h2 >list</h2>
                <h3>
                    {this.state.modelss.map(modelss => 
                        <li>{modelss.model_id}</li>
                    )}
                </h3>
                <button onClick={this.state.modelss.map(modelss => func(modelss.model_id))}>add</button>
            </div>
          );
    }
}
export default Models;
