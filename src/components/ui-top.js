import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {toggleRefill, refillBGSpeed} from '../actions';

class TopUI extends Component {
  refillClicked() {
    if(!this.props.refilling && this.props.fuel !== this.props.fuelMax && this.props.distance > 0) {
      this.props.toggleRefill();
      this.props.refillBGSpeed();

      setTimeout(() => {
        this.props.toggleRefill();
        
      }, 2000);
    }
  }

  render() {
    return(
      <div className="row justify-content-center top-ui">
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
    refilling: state.rocket.refilling
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleRefill,
    refillBGSpeed
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUI);