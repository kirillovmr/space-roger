import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Motion, spring} from 'react-motion';

import {increaseBGSpeedBy1, increaseDistanceByClick} from '../actions';

class Rockets extends Component {
  rocketClicked() {
    this.props.increaseBGSpeedBy1();
    this.props.increaseDistanceByClick();
  }

  render() {
    return (
      <div className="row rockets">
        <div className="col-md-12 align-items-end">
          <Motion
            defaultStyle={{ x: -100, y: 500 }}
            style={{ x: spring(this.props.rocket.refilling ? 0 : -100), y: spring(this.props.rocket.refilling? 0 : 500) }}
          >
          {style => (
            <div style={{ transform: `translate(${style.x}px, ${style.y}px)` }} id="rocket-supply-block">
              <img id="rocket-supply" className="rocket" src="./img/rocket-part.svg" alt=""/>
              <img id="" className="fire fire-supply fire-anim-back" src="./img/fire-y.svg" alt=""/>
              <img id="" className="fire fire-supply fire-anim-front" src="./img/fire-r.svg" alt=""/>
            </div>
          )}
          </Motion>

          <div id="rocket-block">
            <img id="rocket-main" onClick={this.rocketClicked.bind(this)} className="rocket" src="./img/rocket-part.svg" alt=""/>
            <Motion
              defaultStyle={{ width: 100, ml: 0 }}
              style={{ width: spring(this.props.rocket.refilling? 0 : 100), ml: spring(this.props.rocket.refilling? 50 : 0) }}
            >
            {style => (
              <div>
                <img id="" style={{ width: `${style.width}%`, marginLeft: `${style.ml}%` }} className="fire fire-main fire-anim-back" src="./img/fire-y.svg" alt=""/>
                <img id="" style={{ width: `${style.width}%`, marginLeft: `${style.ml}%` }} className={`fire fire-main fire-anim-front ${ this.props.rocket.refilling ? 'hidden' : '' }`} src="./img/fire-r.svg" alt=""/>
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
    increaseDistanceByClick
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rockets);