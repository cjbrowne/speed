import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import _ from 'lodash';

import carService from '../services/CarService';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

export default class CarEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            carId: 0,
            error: null
        }
        if(props.match.params.carId !== undefined) {
            carService.loadCar(props.match.params.carId).then((car) => {
                this.setState({
                    code: car.code,
                    carId: car.id
                });
            });
        } else {
            carService.createNewCar().then((car) => {
                this.setState({
                    code: car.code,
                    carId: car.id
                });
            });
        }
    }

    render() {
        let onChange = (newCode) => {
            this.setState({
                code: newCode
            });
        }

        let onSaveClicked = () => {

            try {
                let x = eval(`(${this.state.code})`);

                console.debug(x, this.state.code);

                this.setState({
                    error: null
                });
            } catch (e) {
                // todo: display the error to the user
                console.log(e);
                this.setState({
                    error: e.toString()
                });
            } finally {
                // always save the car even with syntax errors
                carService.saveCar(this.state.carId, {
                    code: this.state.code,
                    id: this.state.carId
                });
            }
        }

        return (
            <div className="CarEditor">
                <div className="Error">
                    {this.state.error}
                </div>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    onChange={onChange}
                    value={this.state.code}
                    name="CarCode"
                    editorProps={{$blockScrolling: true}}
                    height="90vh"
                    width="90vw"
                    />
                <button onClick={onSaveClicked}>Save</button>
                <Link to={`/car/${this.state.carId}/test`} onClick={onSaveClicked}>Test Car</Link>
            </div>   
        );
    }
}