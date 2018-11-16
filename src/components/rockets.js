import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {increaseSpeedBy1} from '../actions';

class Rockets extends Component {
  rocketClicked() {
    this.props.increaseSpeedBy1();
  }

  render() {
    return (
      <div className="row rockets">
        <div className="col-md-12 align-items-end">
        
          <div id="rocket-supply-block">
            <img id="rocket-supply" className="rocket" src="./img/rocket-part.svg" alt=""/>
            <img id="" className="fire fire-supply" src="./img/fire-y.svg" alt=""/>
            <img id="" className="fire fire-supply" src="./img/fire-r.svg" alt=""/>
          </div>

          <div id="rocket-block">
            <img id="rocket-main" onClick={this.rocketClicked.bind(this)} className="rocket" src="./img/rocket-part.svg" alt=""/>
            <img id="" className="fire fire-main" src="./img/fire-y.svg" alt=""/>
            <img id="" className="fire fire-main" src="./img/fire-r.svg" alt=""/>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    increaseSpeedBy1
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rockets);