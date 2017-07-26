import React, { Component } from 'react';

import '../style.css';

const teamID = ["1a", "1b", "1c", "1d", "1e", "1f", "2a", "2b", "2c", "2d", "2e", "2f", "3a", "3b", "3c", "3d", "3e", "3f", "4a", "4b", "4c", "4d", "4e", "4f", "5a", "5b", "5c", "5d", "5e", "5f", "6a", "6b", "6c", "6d", "6e", "6f", "7a", "7b", "7c", "7d", "7e", "7f", "8a", "8b", "8c", "8d", "8e", "8f", "9a", "9b", "9c", "9d", "9e", "9f", "10a", "10b", "10c", "10d", "10e", "10f", "11a", "11b", "11c", "11d", "11e", "11f", "12a", "12b", "12c", "12d", "12e", "12f"];

class OptionHospital extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const teams = this.props.teams;
    
    return (
      <div className="col-12">
        <div className="row">
          <div className="input-group col-12">
            <table className="table" style={{ 'fontSize': '250%' }}>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Earned</th>
                  <th>Hunted</th>
                  <th>Life</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {teamID.map((item, key) => {
                  if (!this.props.teams[item]['recover'])
                    return <tr key={key}>
                      <th>{item}</th> 
                      <th>{this.props.teams[item]['earned']}</th>
                      <th>{this.props.teams[item]['hunted']}</th>
                      <th>{this.props.teams[item]['life']} → 3</th>
                      <th>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          style={{
                            'fontSize': '100%', 
                            'padding': '2.5%',
                            'width': '110%',
                            'alignContent': 'right'}}
                          onClick={() => {
                            const newData = {
                              money: Number(teams[item]['money']) + Number(teams[item]['earned']),
                              earned: 0,
                              hunted: 3000,
                              life: 3,
                              recover: true
                            }
                            this.props.action(newData, item);
                          }}
                        >
                          done
                        </button>
                      </th>
                    </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default OptionHospital; 
