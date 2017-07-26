import React, { Component } from 'react';

import '../style.css';

class OptionKill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption1: 'team',
      selectedOption2: 'life',
      selectedOption3: 'team',
      selectedOption4: 'life',
      isShowCheckResult: false
    }
    this.handleSelectChange1 = this.handleSelectChange1.bind(this);
    this.handleSelectChange2 = this.handleSelectChange2.bind(this);
    this.handleSelectChange3 = this.handleSelectChange3.bind(this);
    this.handleSelectChange4 = this.handleSelectChange4.bind(this);
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

  handleSelectChange3(e) {
    const val = e.target.value;
    this.setState((state) => { 
      state.selectedOption3 = val;
      state.isShowCheckResult = this.handleCheck(state); 
      return state;
    });
  }

  handleSelectChange4(e) {
    const val = e.target.value;
    this.setState((state) => { 
      state.selectedOption4 = val;
      state.isShowCheckResult = this.handleCheck(state); 
      return state;
    });
  }

  handleCheck(state) {
    const { selectedOption1, selectedOption2, selectedOption3, selectedOption4 } = state;
    if (selectedOption1 === 'team') return false;
    if (selectedOption2 === 'life') return false;
    if (selectedOption3 === 'team') return false;
    if (selectedOption4 === 'life') return false;
    if (selectedOption1 === selectedOption3) return false;
    return true;
  }

  render() {
    const { selectedOption1, selectedOption2, selectedOption3, selectedOption4, isShowCheckResult } = this.state;
    const teams = this.props.teams;
    const showCheckResult = isShowCheckResult ? 
      <div className="row island-row-result">
        <div className="col-12 island-check-result">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Team {selectedOption1}</th>
                <th>Team {selectedOption3}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">生命值</th>
                <td>{teams[selectedOption1]['life']} → {Number(teams[selectedOption1]['life']) + Number(selectedOption2)}</td>
                <td>{teams[selectedOption3]['life']} → {Number(teams[selectedOption3]['life']) + Number(selectedOption4)}</td>
              </tr>
              <tr>
                <th scope="row">懸賞金</th>
                <td>{teams[selectedOption1]['hunted']}</td>
                <td>{teams[selectedOption3]['hunted']}</td>
              </tr>
              <tr>
                <th scope="row">殺敵數</th>
                <td>{teams[selectedOption1]['kill']} → {teams[selectedOption1]['kill'] + 1}</td>
                <td>{teams[selectedOption3]['kill']}</td>
              </tr>
              <tr>
                <th scope="row">被殺數</th>
                <td>{teams[selectedOption1]['death']}</td>
                <td>{teams[selectedOption3]['death']} → {teams[selectedOption3]['death'] + 1}</td>
              </tr>
            </tbody>
          </table>
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
            const earnedHunted = Number(teams[selectedOption3]['hunted']) / 3;
            const earned = Number(teams[selectedOption1]['earned']) + (
              selectedOption4 === "0" ? 0 :
              selectedOption4 === "-1" ? earnedHunted : earnedHunted * 2
            );
            const hunted = earned < 2001 ? 3000 : earned < 4001 ? 6000 : 9000;
            const jail = teams[selectedOption3]['jail'] === 'free' ? 
              (Number(teams[selectedOption3]['life']) + Number(selectedOption4) <= 0 ? 'needed' : 'free') : 
              teams[selectedOption3]['jail'];
            const newData1 = {
              life: Number(teams[selectedOption1]['life']) + Number(selectedOption2),
              earned: earned,
              hunted: hunted,
              kill: teams[selectedOption1]['kill'] + 1
            }
            const newData2 = {
              life: Number(teams[selectedOption3]['life']) + Number(selectedOption4),
              death: teams[selectedOption3]['death'] + 1,
              jail: jail
            }
            this.props.action(newData1, selectedOption1);
            this.props.action(newData2, selectedOption3);
            this.setState({ isShowCheckResult: false });  
          }}
        >
          apply
        </button>
      </div> : '';

    return (
      <div className="col-12">
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

            <select 
              className="custom-select island-select"
              onChange={this.handleSelectChange2}
              value={selectedOption2}
              id="formSelect2" 
              style={{ 'fontSize': '250%', 'padding': '2.5%', 'width': '20%', 'borderBottomLeftRadius': '0px' }}>
              <option value="life">life</option> <option value="+1">+1</option><option value="0">0</option><option value="-1">-1</option><option value="-2">-2</option>
            </select>

            <div 
              className="input-group-addon"
              style={{
                'fontSize': '250%', 
                'padding': '2.5%', 
                'width': '20%',
                'borderBottomLeftRadius': '0px'}}>
              kill
            </div>

            <select 
              className="custom-select island-select"
              onChange={this.handleSelectChange3}
              value={selectedOption3}
              id="formSelect3" 
              style={{ 'fontSize': '250%', 'padding': '2.5%', 'width': '20%', 'borderBottomLeftRadius': '0px' }}>
              <option value="team">team</option> <option value="0a">0a</option><option value="0b">0b</option><option value="0c">0c</option><option value="0d">0d</option><option value="0e">0e</option><option value="0f">0f</option><option value="0g">0g</option><option value="0h">0h</option><option value="0i">0i</option><option value="0j">0j</option><option value="0k">0k</option><option value="0l">0l</option><option value="1a">1a</option><option value="1b">1b</option><option value="1c">1c</option><option value="1d">1d</option><option value="1e">1e</option><option value="1f">1f</option><option value="2a">2a</option><option value="2b">2b</option><option value="2c">2c</option><option value="2d">2d</option><option value="2e">2e</option><option value="2f">2f</option><option value="3a">3a</option><option value="3b">3b</option><option value="3c">3c</option><option value="3d">3d</option><option value="3e">3e</option><option value="3f">3f</option><option value="4a">4a</option><option value="4b">4b</option><option value="4c">4c</option><option value="4d">4d</option><option value="4e">4e</option><option value="4f">4f</option><option value="5a">5a</option><option value="5b">5b</option><option value="5c">5c</option><option value="5d">5d</option><option value="5e">5e</option><option value="5f">5f</option><option value="6a">6a</option><option value="6b">6b</option><option value="6c">6c</option><option value="6d">6d</option><option value="6e">6e</option><option value="6f">6f</option><option value="7a">7a</option><option value="7b">7b</option><option value="7c">7c</option><option value="7d">7d</option><option value="7e">7e</option><option value="7f">7f</option><option value="8a">8a</option><option value="8b">8b</option><option value="8c">8c</option><option value="8d">8d</option><option value="8e">8e</option><option value="8f">8f</option><option value="9a">9a</option><option value="9b">9b</option><option value="9c">9c</option><option value="9d">9d</option><option value="9e">9e</option><option value="9f">9f</option><option value="10a">10a</option><option value="10b">10b</option><option value="10c">10c</option><option value="10d">10d</option><option value="10e">10e</option><option value="10f">10f</option><option value="11a">11a</option><option value="11b">11b</option><option value="11c">11c</option><option value="11d">11d</option><option value="11e">11e</option><option value="11f">11f</option><option value="12a">12a</option><option value="12b">12b</option><option value="12c">12c</option><option value="12d">12d</option><option value="12e">12e</option><option value="12f">12f</option>              
            </select>

            <select 
              className="custom-select island-select"
              onChange={this.handleSelectChange4}
              value={selectedOption4}
              id="formSelect4" 
              style={{ 'fontSize': '250%', 'padding': '2.5%', 'width': '20%', 'borderBottomLeftRadius': '0px' }}>
              <option value="life">life</option> <option value="0">0</option><option value="-1">-1</option><option value="-2">-2</option>
            </select>
          </div>
        </div>
        
        {showCheckResult}

      </div>
    );
  }
}

export default OptionKill; 
