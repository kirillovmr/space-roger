import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Motion, spring} from 'react-motion';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

import { increaseBGSpeedBy1, increaseDistanceByClick,
  stopFlying, startFlying } from '../actions';

class Rockets extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.rocket.distance === nextProps.rocket.distance - 1 * this.props.rocket.clickMultiplier) {
      return false;
    };

    return true;
  }

  rocketClicked() {
    if (!this.props.rocket.refilling && this.props.rocket.fuel > 0) {
      this.props.increaseBGSpeedBy1();
      this.props.increaseDistanceByClick();

      this.fireTimer();
    }
  }

  fireTimer() {
    // If rocket is flying
    if(this.props.rocket.flying) {
      clearTimeout(this.fireTimerId);
      this.fireTimerId = setTimeout(this.switchOffFire.bind(this), 1000);

    } else {
      // If rocket is not flying
      this.props.startFlying();
      this.fireTimerId = setTimeout(this.switchOffFire.bind(this), 1000);
    }
  }
  switchOffFire() {
    this.props.stopFlying();
  }

  render() {
    console.log('🖥Rerender rockets');
    return (
      <div className="row rockets">
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue=" "
          onKeyHandle={this.rocketClicked.bind(this)}
        />
        <div className="col-md-12 align-items-end">
          <Motion
            defaultStyle={{ x: -100, y: 500 }}
            style={{ x: spring(this.props.rocket.refilling ? 0 : -100), y: spring(this.props.rocket.refilling? 0 : 500) }}
          >
          {style => (
            <div style={{ transform: `translate(${style.x}px, ${style.y}px)` }} id="rocket-supply-block">
              <img id="rocket-supply" className="rocket" src="./img/rocket-part.svg" />
              <img className="fire fire-supply fire-anim-back" src="./img/fire-y.svg" />
              <img className="fire fire-supply fire-anim-front" src="./img/fire-r.svg" />
            </div>
          )}
          </Motion>

          <div id="rocket-block">
            <img id="rocket-main" onClick={this.rocketClicked.bind(this)} className="rocket" src="./img/rocket-part.svg" />
            <Motion
              defaultStyle={{ width: 100, ml: 0 }}
              style={{ width: spring(this.props.rocket.refilling? 0 : !this.props.rocket.flying? 0 : 100), ml: spring(this.props.rocket.refilling? 50 : !this.props.rocket.flying ? 50 : 0) }}
            >
            {style => (
              <div>
                <img style={{ width: `${style.width}%`, marginLeft: `${style.ml}%` }} className={`fire fire-main fire-anim-back ${ !this.props.rocket.flying ? 'hiddenn' : '' }`} src="./img/fire-y.svg" />
                <img style={{ width: `${style.width}%`, marginLeft: `${style.ml}%` }} className={`fire fire-main fire-anim-front ${ !this.props.rocket.flying ? 'hiddenn' : '' }`} src="./img/fire-r.svg" />
              </div>
            )}
            </Motion>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rocket: state.rocket
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    increaseBGSpeedBy1,
    increaseDistanceByClick,
    stopFlying, startFlying,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rockets);