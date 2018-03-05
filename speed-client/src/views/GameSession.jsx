import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Renderer from '../game/Renderer';

import carService from '../services/CarService';
import gameService from '../services/GameService';

export default class GameSession extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.test) {
            carService.loadCar(this.props.match.params.carId).then((car) => {
                gameService.createTestSession(car).then((session) => {
                    this.initCanvas(session.id);
                });
            })
        } else {
            gameService.loadSession(this.props.match.params.sessionId).then((session) => {
                // todo

                this.initCanvas(session.id);
            }).catch((error) => {
                // todo
            })
        }

    }

    initCanvas(sessionId) {
        const ctx = this.refs.game.getContext('2d');
        const cvs = this.refs.game;
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,1280,720);

        let renderer = new Renderer(ctx, cvs, sessionId);
        renderer.start();
    }

    componentWillUnmount() {
        gameService.destroySession(this.props.test ? 'test' : this.props.match.params.sessionId);
    }

    render() {
        let onPauseClicked = () => {
            gameService.pause();
            this.forceUpdate();
        }
        let onPlayClicked = () => {
            gameService.play();
            this.forceUpdate();
        }

        let playPauseButton = gameService.isPaused ?
            <button onClick={onPlayClicked}>Play</button> :
            <button onClick={onPauseClicked}>Pause</button>
        ;

        return (<div className="GameSession">
            <canvas ref="game" width="1280" height="720">
            </canvas>
            {playPauseButton}
            {this.props.test ? 
                <Link to={`/car/${this.props.match.params.carId}/edit`}>Edit Car</Link> :
                null
            }
        </div>);
    }
}