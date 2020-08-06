import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
class AppIdle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeout: 60000 * 1
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
export default withRouter(AppIdle);
