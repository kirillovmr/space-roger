import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {perks as allPerks, upgrades as allUpgrades} from '../config/perks';

import {togglePerkAvailable, applyPerk, applyUpgrade, autoFly} from '../actions';
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
    this.checkPerks();
  }

  // Checking to display perks & upgrades
  async checkPerks() {
    const toCheck = ['perks', 'upgrades'];
    setInterval(() => {
      toCheck.forEach((type) => {
        let allType, unlocked;

        switch(type) {
          case 'perks':
            allType = allPerks;
            break;
          case 'upgrades':
            allType = allUpgrades;
            break;
        }

        const used = this.props.rocket[type];
        const onScreen = _.keys(this.props.ui[type]);

        // Check perks & upgrades to Display
        const toCheckDisplay = _.omit(allType, _.uniq([...used, ...onScreen]));

        _.mapKeys(toCheckDisplay, (payload, perkID) => {
          if (payload.display <= this.props.rocket.distance) {
            this.props.togglePerkAvailable(type, perkID, false);
          }
        });

        // Check perks for Requirements
        // Checking only displayed perks
        const toCheckReq = _.pick(allType, onScreen);
        // console.log('Checking', toCheckReq);

        // Checking perks Requirements
        _.mapKeys(toCheckReq, (payload, perkID) => {

          switch (type) {
            case 'perks':
              unlocked = this.props.ui.perks[perkID];
            break;
            case 'upgrades':
              unlocked = this.props.ui.upgrades[perkID].unlocked;
            break;
          }
        
          if (this.checkRequirements(payload)) {
            // If perk is locked - unlocking
            if(!unlocked) {
              this.props.togglePerkAvailable(type, perkID, true);
            };

          } else {
            // If perk is unlocked - locking
            if(unlocked) {
              this.props.togglePerkAvailable(type, perkID, false);
            };
          };
        });
      });
    }, 1000);
  }

  // Checking requirements of perk. Returns true - fullfill / false - not fullfill.
  checkRequirements(perkPayload) {
    let fullFillReq = true;
    _.mapKeys(perkPayload.requirements, (reqValue, reqName) => {

      // Check perks
      if (reqName === 'perks') {
        reqValue.forEach(perk => {
          if (!hasPerk(perk, this.props.rocket.perks)) {
            fullFillReq = false;
            return;
          }
        });
      }

      // Check upgrades
      if (reqName === 'upgrades') {
        console.log('NEED TO ADD CHECKING OF UPGRADES');
        fullFillReq = false;
        return;
      }

      // Check rest single params
      if (this.props.rocket[reqName] < reqValue) {
        fullFillReq = false;
        return;
      };
    });
    return fullFillReq;
  }

  renderPerks(perksOrUpgrades) {
    let array = [];
    _.mapKeys(this.props.ui[perksOrUpgrades], (perkPayload, ID) => {
      if (perksOrUpgrades === 'perks') { array.push(this.renderPerk(ID)); } else
      if (perksOrUpgrades === 'upgrades') { array.push(this.renderUpgrade(ID)); }
    });
    return array;
  }
  renderPerk(perkID) {
    return (
      <div key={perkID} onClick={this.perkClicked.bind(this)} id={perkID} className={`perk ${this.props.ui.perks[perkID] ? 'unlocked' : ''}`}>
        <img src={`./img/icons/${allPerks[perkID].icon}`} width="50%" height="50%" className="perk-upgrade-inside-icon" />
        <p className="perk-upgrade-cost">{allPerks[perkID].requirements.distance}</p>
      </div>
    );
  }
  renderUpgrade(upgradeID) {
    return (
      <div key={upgradeID} onClick={this.upgradeClicked.bind(this)} id={upgradeID} className={`upgrade ${this.props.ui.upgrades[upgradeID].unlocked ? 'unlocked' : ''}`}>
        <p className="text-monospace text-right upgrade-level">{this.props.ui.upgrades[upgradeID].level}</p>
        <img src={`./img/icons/${allUpgrades[upgradeID].icon}`} width="50%" height="50%" className="perk-upgrade-inside-icon" />
        <p className="perk-upgrade-cost">{this.props.ui.upgrades[upgradeID].requirements.distance}</p>
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
    const upgradeID = upgrade.target.closest('.upgrade').getAttribute('id');
    if (this.checkRequirements(allUpgrades[upgradeID])) {
      console.log(`Applying ${upgradeID}`);
      this.props.applyUpgrade(upgradeID);
    };
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
          {this.renderPerks('perks')}
        </div>
        <div className="upgrades-block">
        {this.renderPerks('upgrades')}
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
    togglePerkAvailable, applyPerk, applyUpgrade, autoFly
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleUI);