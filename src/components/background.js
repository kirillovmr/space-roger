import React, { Component } from 'react';
import {connect} from 'react-redux';

import particlesConfig from '../config/particles-config';

class Background extends Component {
  constructor(props) {
    super(props)
    this.mount = false;
  }

  componentDidMount() {
    particlesJS("particles-js", particlesConfig);
    this.mount = true;
    this.setSpeed();
  }
  setSpeed() {
    pJSDom[0].pJS.particles.move.speed = this.props.bg.speed;
  }

  render() {
    console.log('🖥Rerender Backgroung');
    if(this.mount) {
      this.setSpeed();
    }
    return (
      <div id="particles-js"></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bg: state.background
  };
}

export default connect(mapStateToProps)(Background);