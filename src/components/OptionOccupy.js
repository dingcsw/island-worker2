import React, { Component } from 'react';

import '../style.css';

class OptionOccupy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption1: 'team',
      selectedOption2: 'arena',
      isShowCheckResult: false
    }
    this.handleSelectChange1 = this.handleSelectChange1.bind(this);
    this.handleSelectChange2 = this.handleSelectChange2.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleSelectChange1(e) {
    const val = e.target.value;
    this.setState((state) => { 
      state.selectedOption1 = val;
      state.isShowCheckResult = this.handleCheck(state); 
      return state;
    });
  }

  handleSelectChange2(e) {
    const val = e.target.value;
    this.setState((state) => { 
      state.selectedOption2 = val;
      state.isShowCheckResult = this.handleCheck(state); 
      return state;
    });
  }

  handleCheck(state) {
    const { selectedOption1, selectedOption2 } = state;
    if (selectedOption1 === 'team') return false;
    if (selectedOption2 === 'arena') return false;
    return true;
  }

  render() {
    const { selectedOption1, selectedOption2, isShowCheckResult } = this.state;
    const teams = this.props.teams;
    const showLastResult = (this.props.arenas['1']['moneyToGet'] !== 0 || this.props.arenas['2']['moneyToGet'] !== 0 || this.props.arenas['3']['moneyToGet'] !== 0) ?
      <div className="row island-row-result">
        <div className="col-12 island-check-result">
          <b>Last occupied team(s) in the last night:</b>
          <table className="table">
            <thead>
              <tr>
                <th>arena</th>
                <th>team</th>
                <th>earned</th>
              </tr>
            </thead>
            <tbody>
            {['1', '2', '3'].map((item, key) => this.props.arenas[item]['moneyToGet'] === 0 ? '' :
              <tr key={key}>
                <th scope="row">{item}</th>
                <td>{this.props.arenas[item]['team']}</td>
                <td>{this.props.arenas[item]['moneyToGet']}</td>
              </tr>
            )}
            </tbody>
          </table> 
        </div>
      </div>
    : ''
    const showCheckResult = isShowCheckResult ? (() => {
      const originalTeam = this.props.arenas[selectedOption2]['team'];
      const originalTimestamp = this.props.arenas[selectedOption2]['timestamp'];
      const d = new Date();
      const earn = originalTimestamp ? Math.floor((d.getTime() - originalTimestamp) / 30000) * 1000 : '';
      return (
        <div className="row island-row-result">
          <div className="col-12 island-check-result">
            <b>Team {selectedOption1} will occupy arena {selectedOption2}.</b>
            {
              originalTeam ? 
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Team {originalTeam}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">賺得</th>
                    <td>{earn}</td>
                  </tr>
                </tbody>
              </table> 
              : ""
            }
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{
              'fontSize': '250%', 
              'padding': '2.5%',
              'marginTop': '2.5%',
              'marginLeft': '80%',
              'width': '18%',
              'alignContent': 'right'}}
            onClick={() => {
              const d = new Date();
              const newData2 = {
                team: selectedOption1,
                timestamp: d.getTime()
              }
              if (originalTeam !== '') {
                const earned = Number(teams[originalTeam]['earned']) + earn;
                const hunted = earned < 2001 ? 3000 : earned < 4001 ? 6000 : 9000;
                const newData1 = {
                  earned: earned,
                  hunted: hunted
                }
                this.props.action(newData1, originalTeam);
              }
              this.props.actionArena(newData2, selectedOption2);
              this.setState({ isShowCheckResult: false });  
            }}
          >
            apply
          </button>
        </div>
      );
     })() : '';

    return (
      <div className="col-12" style={{ 'marginTop': '5%' }}>
        <div className="row">
          <div className="input-group col-12">

            <select 
              className="custom-select island-select"
              onChange={this.handleSelectChange1}
              value={selectedOption1}
              id="formSelect1" 
              style={{ 'fontSize': '250%', 'padding': '2.5%', 'width': '20%', 'borderBottomLeftRadius': '0px' }}>
              <option value="team">team</option> <option value="0a">0a</option><option value="0b">0b</option><option value="0c">0c</option><option value="0d">0d</option><option value="0e">0e</option><option value="0f">0f</option><option value="0g">0g</option><option value="0h">0h</option><option value="0i">0i</option><option value="0j">0j</option><option value="0k">0k</option><option value="0l">0l</option><option value="1a">1a</option><option value="1b">1b</option><option value="1c">1c</option><option value="1d">1d</option><option value="1e">1e</option><option value="1f">1f</option><option value="2a">2a</option><option value="2b">2b</option><option value="2c">2c</option><option value="2d">2d</option><option value="2e">2e</option><option value="2f">2f</option><option value="3a">3a</option><option value="3b">3b</option><option value="3c">3c</option><option value="3d">3d</option><option value="3e">3e</option><option value="3f">3f</option><option value="4a">4a</option><option value="4b">4b</option><option value="4c">4c</option><option value="4d">4d</option><option value="4e">4e</option><option value="4f">4f</option><option value="5a">5a</option><option value="5b">5b</option><option value="5c">5c</option><option value="5d">5d</option><option value="5e">5e</option><option value="5f">5f</option><option value="6a">6a</option><option value="6b">6b</option><option value="6c">6c</option><option value="6d">6d</option><option value="6e">6e</option><option value="6f">6f</option><option value="7a">7a</option><option value="7b">7b</option><option value="7c">7c</option><option value="7d">7d</option><option value="7e">7e</option><option value="7f">7f</option><option value="8a">8a</option><option value="8b">8b</option><option value="8c">8c</option><option value="8d">8d</option><option value="8e">8e</option><option value="8f">8f</option><option value="9a">9a</option><option value="9b">9b</option><option value="9c">9c</option><option value="9d">9d</option><option value="9e">9e</option><option value="9f">9f</option><option value="10a">10a</option><option value="10b">10b</option><option value="10c">10c</option><option value="10d">10d</option><option value="10e">10e</option><option value="10f">10f</option><option value="11a">11a</option><option value="11b">11b</option><option value="11c">11c</option><option value="11d">11d</option><option value="11e">11e</option><option value="11f">11f</option><option value="12a">12a</option><option value="12b">12b</option><option value="12c">12c</option><option value="12d">12d</option><option value="12e">12e</option><option value="12f">12f</option>
            </select>

            <div 
              className="input-group-addon"
              style={{
                'fontSize': '250%', 
                'padding': '2.5%', 
                'width': '25%',
                'borderBottomLeftRadius': '0px'}}>
              occupy
            </div>

            <div 
              className="input-group-addon"
              style={{
                'fontSize': '250%', 
                'padding': '2.5%', 
                'width': '25%',
                'borderBottomLeftRadius': '0px'}}>
              arena
            </div>

            <select 
              className="custom-select island-select"
              onChange={this.handleSelectChange2}
              value={selectedOption2}
              id="formSelect3" 
              style={{ 'fontSize': '250%', 'padding': '2.5%', 'width': '30%', 'borderBottomLeftRadius': '0px' }}>
              <option value="arena">name</option><option value="1">1 掩埋場</option><option value="2">2 墓園</option><option value="3">3 岩窟</option>              
            </select>

          </div>
        </div>
        
        {showCheckResult}
        {showLastResult}

      </div>
    );
  }
}

export default OptionOccupy; 
