import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import { getSessionReset } from './helpers/helpersIndex';
import { exitAction } from './store/actions';
import { connect } from 'react-redux';

class AppIdle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeout: 60000 * getSessionReset()
        }

        this.idleTimer = null
        // this.onAction = this._onAction.bind(this)
        //  this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
    }
    _onAction(e) {
        console.log('useridle did something', e, this.idleTimer)
        // this.setState({ isTimedOut: false })
    }

    _onActive(e) {
        console.log('useridle is active', e)
        // this.setState({ isTimedOut: false })
    }

    _onIdle(e) {
        console.log('useridle is idle', e, this.props.history.location.pathname)
        // const isTimedOut = this.state.isTimedOut
        this.idleTimer.reset();
        this.props.exitAction();
    }
    render() {
        return (
            <>
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    // onActive={this.onActive}
                    onIdle={this.onIdle}
                    // onAction={this.onAction}
                    debounce={1000}
                    timeout={this.state.timeout} />
            </>)
    }
}

export default withRouter(connect(null, { exitAction })(AppIdle));


