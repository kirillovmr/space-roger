import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TopUI extends Component {
  render() {
    return(
      <div className="row justify-content-center top-ui">
        <div className="col-12 col-sm-9 col-md-6">
          <div className="row top-ui-row">
            <div className="col-4">
              <p className="fuel-value">136</p>
              <p className="fuel">Fuel</p>
            </div>
            <div className="col-4">
              <p className="distance-value">45053</p>
              <p className="distance">Distance</p>
            </div>
            <div className="col-4">
              <p className="speed-value">36</p>
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

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUI);