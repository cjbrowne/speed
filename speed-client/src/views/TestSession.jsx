import React, { Component } from 'react';

import GameSession from './GameSession';

export default class TestSession extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <GameSession
            test={true}
            track="spa"
            {...this.props}
        />;
    }
}