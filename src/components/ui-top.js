import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import KeyHandler, { KEYPRESS } from 'react-key-handler';

import {toggleRefill, refillBGSpeed, setBGSpeed} from '../actions';
// import {slow} from '../misc/bg-speed';
 
class TopUI extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.distance === nextProps.distance) {
      return false;
    };

    return true;
  }

  refillClicked() {
    if(!this.props.refilling && this.props.fuel !== this.props.fuelMax && this.props.distance > 0) {
      this.props.toggleRefill();
      this.bgSlower();

      setTimeout(() => {
        this.props.toggleRefill();
        setTimeout(() => this.bgSpeeder(), 1000);
      }, 3000);
    }
  }

  // Slows stars on the background
  async bgSlower() {
    this.previousBGSpeed = this.props.starSpeed;
    let x = this.props.starSpeed;
    const step = Math.round(x / 10);

    setInterval(() => {
      if (x > 1) 
        this.props.setBGSpeed(x);
      else return;
      x -= step;
    }, 100);
  }
  async bgSpeeder() {
    if (!this.props.flying) {
      return;
    }
    let x = 5;
    let prevSpeed = this.previousBGSpeed < 100 ?  this.previousBGSpeed : 100;
    const step = Math.round(prevSpeed / 10);

    setInterval(() => {
      if (x < prevSpeed) 
        this.props.setBGSpeed(x);
      else return;
      x += step;
    }, 100);
  }

  render() {
    console.log('🖥Rerender ui-top');
    return(
      <div className="row justify-content-center top-ui">
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="r"
          onKeyHandle={this.refillClicked.bind(this)}
        />
        <div className="col-12 col-sm-9 col-md-6">
          <div className="row top-ui-row">
            <div className="col-4" onClick={this.refillClicked.bind(this)}>
              <p className="fuel-value">{this.props.fuel.toFixed(3)}</p>
              <p className="fuel">Fuel</p>
            </div>
            <div className="col-4">
              <p className="distance-value">{this.props.distance.toFixed(3)}</p>
              <p className="distance">Distance</p>
            </div>
            <div className="col-4">
              <p className="speed-value">{this.props.speed}</p>
              <p className="speed">Speed</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    fuel: state.rocket.fuel,
    fuelMax: state.rocket.fuelMax,
    distance: state.rocket.distance,
    speed: state.rocket.speed,
    refilling: state.rocket.refilling,
    flying: state.rocket.flying,
    starSpeed: state.background.speed
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleRefill,
    refillBGSpeed,
    setBGSpeed
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUI);