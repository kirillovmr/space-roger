import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class MiddleUI extends Component {
  renderPerk() {
    return (
      <div onClick={this.perkClicked} id="perk1" className="perk unlocked">
        <img src="./img/icons/autofly.svg" width="50%" height="50%" className="perk-upgrade-inside-icon" />
        <p className="perk-upgrade-cost">1000k</p>
      </div>
    );
  }

  renderUpgrade() {
    return (
      <div onClick={this.upgradeClicked} id="upgrade1" className="upgrade">
        <p className="text-monospace text-right upgrade-level">3</p>
        <img src="./img/icons/powerclick.svg" width="50%" height="50%" className="perk-upgrade-inside-icon" />
        <p className="perk-upgrade-cost">1000k</p>
      </div>
    );
  }

  perkClicked(perk) {
    const id = perk.target.closest('.perk').getAttribute('id');
    console.log(`Perk ${id} Clicked`);
  }

  upgradeClicked(upgrade) {
    const id = upgrade.target.closest('.upgrade').getAttribute('id');
    console.log(`Upgrade ${id} Clicked`);
  }

  render() {
    return(
      <div className="row perks-upgrades">
        <div className="perks-block">
          {this.renderPerk()}
          {this.renderPerk()}
        </div>
        <div className="upgrades-block">
          {this.renderUpgrade()}
          {this.renderUpgrade()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MiddleUI);