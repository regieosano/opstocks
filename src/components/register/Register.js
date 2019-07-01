import React, { Component } from 'react'
import axios from 'axios';

import '../../styles/scss/Register.scss';

class Register extends Component {


  constructor(props) {
    super(props)

    this.state = {
        officeNames: [],
        officeName: '',
        userName: '',
        email: '',
        userPosition: '',
        password: '',
        password2: '',
        isAdmin: false
    }

  }

  
  componentWillMount() {
    axios.get('http://localhost:7777/opstocks/api/office/names')
    .then((officeNames) => {
        this.storeOffices(officeNames['data']);
    })
    .catch((err) => {
        alert('Something went wrong... ' + err)
    })

  }

    
 
  handleNewRegister = () => {

      axios.post('http://localhost:7777/opstocks/api/register', {
          
          officeName: this.state.officeName,
          user: {
              userName: this.state.userName,
              email: this.state.email,
              userPosition: {
                  position: this.state.userPosition
              },
              password: this.state.password,
              isAdmin: this.state.isAdmin
          },
         
      }).then(() => {
          alert('You have been REGISTERED. You can now LOGIN.');
      }).catch((err) => {
          alert('This ' + this.state.officeName + ' Office already REGISTERED.')
      }).finally(() => {
          this.clearInputValues();
      })

    
  }

  handleInputKey = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSelectOffice = (e) => {
    this.setState({
      officeName: e.target.value
    })
  }

  storeOffices = (officeNames) => {
    this.setState({
        officeNames
    });
  }

  clearInputValues = () => {
    this.refs.officeSelect.selectedIndex = 0;
    this.refs.nameInput.value = '';
    this.refs.positionInput.value = '';
    this.refs.emailInput.value = '';
    this.refs.passwordInput.value = '';
    this.refs.passwordInput2.value = '';
  }

  render() {

    const { officeNames } = this.state;
    
    const register = (
        <form noValidate>
          <div className="form-group mb-3">
              <label>Office</label>
              <select className="custom-select"
                      id="userOffice"
                      onChange={this.handleSelectOffice}
                      ref="officeSelect"
                >
                <option value="0">Choose...</option>
                {officeNames.map(officeName => 
                    <option key={officeName._id} value={officeName.officeName}>
                       {officeName.officeName}
                    </option>
                )}
              </select>
           </div>
           <div className="form-group">
             <label>Custodian</label>
             <input type="text"
                    className="form-control"
                    id="userName"
                    placeholder="Type Complete Name"
                    onKeyUp={this.handleInputKey}
                    ref="nameInput"
                   
              />
           </div>
           <div className="form-group">
             <label>Position</label>
             <input type="text" 
                  className="form-control"
                  id="userPosition"
                  placeholder="Type Position"
                  onKeyUp={this.handleInputKey}
                  ref="positionInput"
              />
           </div>
           <div className="form-group">
             <label>Email</label>
             <input type="email"
                    className="form-control"
                    id="email"
                    placeholder="Type Email"
                    onKeyUp={this.handleInputKey}
                    ref="emailInput"
              />
           </div>
           <div className="form-group">
             <label>Password</label>
             <input type="password" 
                    className="form-control"
                    id="password"
                    placeholder="Type Password"
                    onKeyUp={this.handleInputKey}
                    ref="passwordInput"
              />
           </div>
           <div className="form-group">
             <label>Confirm Password</label>
             <input type="password" 
                    className="form-control"
                    id="password2"
                    placeholder="Type Password Again"
                    onKeyUp={this.handleInputKey}
                    ref="passwordInput2"
              />
           </div>
          
           
           <div className="register-buttons">
              <button type="button" className="btn btn-primary register-submit" 
                      data-toggle="modal" 
                      data-target="#genericModal"
                      onClick={this.handleNewRegister}
                >Submit
              </button>
              <button type="button"
                      className="btn btn-danger ml-2 register-cancel"
                      data-toggle="modal" 
                      data-target="#genericModal"
                      onClick={this.clearInputValues}
                >Cancel
              </button>
           </div>
        </form>
      );


    return (
      <div>
         { register }
      </div>
    )
  }
}

export default Register

