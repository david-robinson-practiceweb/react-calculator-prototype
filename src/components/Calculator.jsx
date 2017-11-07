import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import axios from 'axios';
import CalculatorResponse from './CalculatorResponse'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            uischema: {},
            output: {},
            submitted: false
        }
        // Bind this to handlers.
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // TODO fetch from an API or cache.
        let url = "https://hookb.in/vQQYqqwr";
        axios.get(url)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });
        this.setState({
            schema :{
                title: "Todo",
                type: "object",
                required: ["title"],
                properties: {
                    title: {type: "string", title: "Title", default: "A new task"},
                    done: {type: "boolean", title: "Done?", default: false},
                    result: {type:"object", title: "RESULT", properties: {

                    }}
                }
            },
            uiSchema: {
                result: {
                    "ui:field" : "markupBlock"
                }
            },
            output: {}
        });
    }

    onSubmit(formData) {
console.log(formData.formData);
        let url = 'https://hookb.in/vQQYqqwr';
        axios.post(url, formData.formData)
            .then((result) => {
                console.log(result);
                let randomData = Math.random(1, 50, true)
                let output = {
                    "result": "example "+randomData
                }
                this.setState({
                    output: output,
                    submitted: true
                })
            });

    }
    render() {
        return(
            <div>
                <Form schema={this.state.schema}  onSubmit={this.onSubmit}/>
                {this.state.submitted &&
                    <CalculatorResponse data={this.state.output}/>
                }
            </div>
        );
    }
}

export default Calculator;