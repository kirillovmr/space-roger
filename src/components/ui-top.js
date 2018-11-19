import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CountUp from 'react-countup';

import KeyHandler, { KEYPRESS } from 'react-key-handler';

import {toggleRefill, refillBGSpeed, setBGSpeed} from '../actions';

export function refillClicked() {
  if(!this.props.rocket.refilling && this.props.rocket.fuel !== this.props.rocket.fuelMax && this.props.rocket.distance > 0) {
    this.props.toggleRefill();
    this.bgSlower();

    setTimeout(() => {
      this.props.toggleRefill();
      setTimeout(() => this.bgSpeeder(), 1000);
    }, 2900);
  }
}
 
class TopUI extends Component {
  componentDidMount() {
    refillClicked = refillClicked.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.rocket.distance === nextProps.distance && 
        this.props.rocket.fuel === nextProps.fuel && 
        this.props.rocket.speed === nextProps.speed) {
      return false;
    };

    return true;
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
    if (!this.props.rocket.flying) {
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

  formatNumber(number) {
    return number;
  }

  counter(param) {
    let decimals = 1;
    if (param === 'distance') {
      decimals = 2;
    } else if (param === 'fuel') {
      decimals = 3;
    }

    return (
      <CountUp 
        start={this.formatNumber(this.props.rocket.previous[param])} 
        end={this.formatNumber(this.props.rocket[param])} 
        duration={1.0}
        useEasing={false}
        decimals={decimals} />
    );
  }

  render() {
    console.log('🖥Rerender ui-top');

    return(
      <div className="row justify-content-center top-ui">
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="r"
          onKeyHandle={refillClicked}
        />
        <div className="col-12 col-sm-9 col-md-6">
          <div className="row top-ui-row">
            <div className="col-4" onClick={refillClicked}>
              <p className="fuel-value">{this.counter('fuel')}</p>
              <p className="fuel">Fuel</p>
            </div>
            <div className="col-4">
              <p className="distance-value">{this.counter('distance')}</p>
              <p className="distance">Distance</p>
            </div>
            <div className="col-4">
              <p className="speed-value">{this.counter('speed')}</p>
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
    rocket: state.rocket,
    starSpeed: state.background.speed,
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