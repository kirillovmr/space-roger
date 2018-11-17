import React, { Component, PureComponent } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {perks as allPerks} from '../config/perks';

import {togglePerkAvailable} from '../actions';

class MiddleUI extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.ui === nextProps.ui) {
      return false;
    };

    return true;
  }
  
  componentDidMount() {
    this.checkUpgrades();
  }

  // Checking to display upgrades
  async checkUpgrades() {
    setInterval(() => {

      const perksUsed = this.props.rocket.perks;
      const perksOnScreen = _.keys(this.props.ui.perks);

      // Check perks to Display
      const perksToCheckDisplay = _.omit(allPerks, _.uniq([...perksUsed, ...perksOnScreen]));

      _.mapKeys(perksToCheckDisplay, (perkPayload, perkID) => {
        if (perkPayload.display <= this.props.rocket.distance) {
          this.props.togglePerkAvailable(perkID, false);
        }
      });

      // Check perks for Requirements
      // Checking only displayed perks
      const perksToCheckReq = _.pick(allPerks, perksOnScreen);
      // console.log('Checking', perksToCheckReq);

      // Checking perks Requirements
      _.mapKeys(perksToCheckReq, (perkPayload, perkID) => {
      
        if (this.checkRequirements(perkPayload)) {
          // If perk is locked - unlockeng
          if(!this.props.ui.perks[perkID]) {
            this.props.togglePerkAvailable(perkID, true);
          };

        } else {
          // If perk is unlocked - locking
          if(this.props.ui.perks[perkID]) {
            this.props.togglePerkAvailable(perkID, false);
          };
        };

      });
      
    }, 1000);
  }

  // Checking requirements of perk. Returns true - fullfill / false - not fullfill.
  checkRequirements(perkPayload) {
    let fullFillReq = true;
    _.mapKeys(perkPayload.requirements, (reqValue, reqName) => {

      if (this.props.rocket[reqName] < reqValue) {
        fullFillReq = false;
        return;
      };
    });
    return fullFillReq;
  }

  renderPerks() {
    let arrayPerks = [];
    _.mapKeys(this.props.ui.perks, (perkPayload, perkID) => {
      arrayPerks.push(this.renderPerk(perkID));
    });
    return arrayPerks;
  }
  renderPerk(perkID) {
    return (
      <div key={perkID} onClick={this.perkClicked} id={perkID} className={`perk ${this.props.ui.perks[perkID] ? 'unlocked' : ''}`}>
        <img src={`./img/icons/${allPerks[perkID].icon}`} width="50%" height="50%" className="perk-upgrade-inside-icon" />
        <p className="perk-upgrade-cost">{allPerks[perkID].requirements.distance}</p>
      </div>
    );
  }

  renderUpgrades() {

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
    console.log('🖥Reredner ui-middle');
    return(
      <div className="row perks-upgrades">
        <div className="perks-block">
          {this.renderPerks()}
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
    rocket: state.rocket,
    ui: state.ui,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    togglePerkAvailable,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleUI);