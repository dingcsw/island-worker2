import React, { Component } from 'react';

import OptionKill from './OptionKill';
import OptionMoneyMarket from './OptionMoneyMarket';
import OptionMoneyGarena from './OptionMoneyGarena';
import OptionOccupy from './OptionOccupy';
import OptionPurged from './OptionPurged';
import OptionRescue from './OptionRescue';
import OptionShutDown from './OptionShutDown';
import OptionHospital from './OptionHospital';
import '../style.css';
  
const teamID = ["1a", "1b", "1c", "1d", "1e", "1f", "2a", "2b", "2c", "2d", "2e", "2f", "3a", "3b", "3c", "3d", "3e", "3f", "4a", "4b", "4c", "4d", "4e", "4f", "5a", "5b", "5c", "5d", "5e", "5f", "6a", "6b", "6c", "6d", "6e", "6f", "7a", "7b", "7c", "7d", "7e", "7f", "8a", "8b", "8c", "8d", "8e", "8f", "9a", "9b", "9c", "9d", "9e", "9f", "10a", "10b", "10c", "10d", "10e", "10f", "11a", "11b", "11c", "11d", "11e", "11f", "12a", "12b", "12c", "12d", "12e", "12f"];

class Island extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: 'hospital'
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.setState({ selectedOption: e.target.value });
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="container">
        <div className="row island-row" style={{ "fontSize": "200%", "paddingLeft": "5%" }}>
          {this.props.env.timing}
        </div>
        <div className="row island-row">
          <div className="col-12">
            <select 
              className="custom-select island-select"
              onChange={this.handleSelectChange}
              value={selectedOption}
              id="formSelect">
              <option value="market">市集</option>
              <option value="arena">競技場</option>
              <option value="jail">監獄</option>
              <option value="judge">審判者</option>
              <option value="hospital">醫院</option>
            </select>
          </div>
        </div>
        <div className="row island-row">
          {
            selectedOption === "judge" ? 
              <OptionKill 
                action={this.props.modifyTeamData}  
                teams={this.props.teams}/> : 
            selectedOption === "market" ? 
              <OptionMoneyMarket 
                action={this.props.modifyTeamData} 
                teams={this.props.teams}/> : 
            selectedOption === "arena" ? 
              [
                <OptionMoneyGarena
                  action={this.props.modifyTeamData} 
                  teams={this.props.teams}/>,
                <OptionOccupy
                  action={this.props.modifyTeamData} 
                  actionArena={this.props.modifyArenaData}
                  arenas={this.props.arenas}
                  teams={this.props.teams}/>
              ] :
            selectedOption === "jail" ? 
              [
                <OptionRescue 
                  action={this.props.modifyTeamData} 
                  teams={this.props.teams}/>, 
                <OptionShutDown
                  action={this.props.modifyTeamData} 
                  actionEnv={this.props.modifyEnvData}
                  env={this.props.env}
                  teams={this.props.teams}/>,
                <div className="col-12">
                  <div className="row island-row-result">
                    <div className="col-12 island-check-result">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Team</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamID.map((item, key) => {
                            if (this.props.teams[item]['jail'] !== 'free')
                              return <tr key={key}>
                                <th>{item}</th> 
                                <th>{
                                  this.props.teams[item]['jail'] === 'needed' ? '需入獄' : 
                                  this.props.teams[item]['jail'] === 'in' ? '已入獄' : ''
                                }</th>
                              </tr>
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ] : 
            selectedOption === "hospital" ? 
              <OptionHospital
                action={this.props.modifyTeamData} 
                teams={this.props.teams}/> : ""
          }
        </div>
      </div>
    );
  }
}

export default Island;
