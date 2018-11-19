import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {perks as allPerks} from '../config/perks';

import {togglePerkAvailable, applyPerk, autoFly} from '../actions';
import {fireTimer} from './rockets';
import {refillClicked} from './ui-top';
import {hasPerk} from '../misc';

class MiddleUI extends Component {
  constructor(props) {
    super(props);
    this.perkIntervals = {};
  }

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
      <div key={perkID} onClick={this.perkClicked.bind(this)} id={perkID} className={`perk ${this.props.ui.perks[perkID] ? 'unlocked' : ''}`}>
        <img src={`./img/icons/${allPerks[perkID].icon}`} width="50%" height="50%" className="perk-upgrade-inside-icon" />
        <p className="perk-upgrade-cost">{allPerks[perkID].requirements.distance}</p>
      </div>
    );
  }

  renderUpgrades() {

  }
  renderUpgrade() {
    return (
      <div onClick={this.upgradeClicked.bind(this)} id="upgrade1" className="upgrade">
        <p className="text-monospace text-right upgrade-level">3</p>
        <img src="./img/icons/powerclick.svg" width="50%" height="50%" className="perk-upgrade-inside-icon" />
        <p className="perk-upgrade-cost">1000k</p>
      </div>
    );
  }

  perkClicked(perk) {
    const perkID = perk.target.closest('.perk').getAttribute('id');
    if (this.checkRequirements(allPerks[perkID])) {
      this.applyPerk(perkID);
    };
  }
  upgradeClicked(upgrade) {
    const id = upgrade.target.closest('.upgrade').getAttribute('id');
    console.log(`Upgrade ${id} Clicked`);
  }

  applyPerk(perkID) {
    this.props.applyPerk(perkID);

    console.log(perkID, 'applied');
    switch (perkID) {
      case 'autofly':
        this.perkAutofly();
        break;
      case 'autofuel':
        this.perkAutofuel();
      default:
        break;
    }
  }

  /* -- -- PERKS -- -- */
  perkAutofly() {
    clearInterval(this.perkIntervals['autofly']);
    // Dont need Autofuel interval more
    clearInterval(this.perkIntervals['autofuel']);
    this.perkIntervals['autofly'] = setInterval(() => {
      if (!this.props.rocket.refilling && this.props.rocket.fuel > 0) {
        this.props.autoFly();
        fireTimer();

      } else if (!this.props.rocket.refilling && this.props.rocket.fuel <= 0 && hasPerk('autofuel', this.props.rocket.perks)) {
        refillClicked();
      }
    }, 1000);
  }
  perkAutofuel() {
    clearInterval(this.perkIntervals['autofuel']);
    // We dont need this if we have autofly. Autofly able to load fuel.
    if (!hasPerk('autofly', this.props.rocket.perks)) {
      this.perkIntervals['autofuel'] = setInterval(() => {
        if (!this.props.rocket.refilling && this.props.rocket.fuel <= 0 && hasPerk('autofuel', this.props.rocket.perks)) {
          refillClicked();
        }
      }, 500);
    } 
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
    togglePerkAvailable, applyPerk, autoFly
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleUI);