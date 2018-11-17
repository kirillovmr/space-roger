import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class BottomUI extends Component {
  globalClicked() {
    console.log('Global btn clicked');
  }

  settingsClicked() {
    console.log('Settinhs btn clicked');
  }

  render() {
    console.log('🖥Rerender ui-bottom');
    return (
      <div className="row align-items-end bottom-ui">
        <div className="col-3 col-sm-3 col-md-2 offset-1 offset-sm-2 offset-md-2 offset-lg-2 offset-xl-2" id="left-bottom-button">
          <div id="global" onClick={this.globalClicked}></div>
        </div>
        <div className="col-3 col-sm-3 col-md-2 offset-4 offset-sm-2 offset-md-4 offset-lg-4 offset-xl-4" id="right-bottom-button">
          <div id="settings" onClick={this.settingsClicked}></div>
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

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomUI);