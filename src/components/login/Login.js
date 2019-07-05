import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

import '../../styles/scss/Login.scss';

class Login extends Component {

    modalLogin = true

    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: ''
        }    
    }
    
    handleInputKey = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleLogInUserNow = () => {
        axios.post('http://localhost:7777/opstocks/api/login', {
                
                 email: this.state.userEmail,
                 password: this.state.userPassword
                                  
        }).then((response) => {
          
            let data = response.data;

            if (data['isAdmin']) {
                this.props.history.push(`/admindashboard`, {
                    emerald: data
                });
            } else {
               
                let config = {
                    headers: {
                      'x-auth-token': data['xauthtoken'],
                    }
                }
    
                axios.get('http://localhost:7777/opstocks/api/request/lastno', config)
                    .then(response => { 
                        const baseRISNo = response.data['lastRisNo']
                        this.props.history.push(`/userdashboard`, {
                            majestic: data,
                            baseRISNo
                        })
                     })
                    .catch(err => alert(err))
            }

            
        }).catch((err) => {
              alert('Invalid Username/Password Entered!')
         
        })
      
    }

    clearInputValues = () => {
        this.emailUserInput.value = '';
        this.passwordUserInput.value = '';
    }

    render() { 

        const login = (
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="email"
                         className="form-control"
                         id="userEmail"
                         placeholder="Email"
                         onKeyUp={this.handleInputKey}
                         ref={inputElement => this.emailUserInput = inputElement}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input type="password"
                         className="form-control"
                         id="userPassword"
                         placeholder="Password"
                         onKeyUp={this.handleInputKey}
                         ref={inputElement => this.passwordUserInput = inputElement}
                  />
                </div>
              </div>
            
        
             <div className="login-button">
                <button type="button" 
                        className="btn btn-primary go-button"
                        onClick={this.handleLogInUserNow}
                        data-toggle="modal"
                        data-target="#genericModal"
                      
                >
                    Proceed
                </button>
                <button type="button"
                        className="btn btn-danger ml-2 cancel-button"
                        data-toggle="modal"
                        data-target="#genericModal"
                        onClick={this.clearInputValues}
                >
                    Cancel
                </button>
             </div>
            </form>
          )
        
        return (
            <div>
           
             <div>
               { login }
             </div>
            </div>
           
        )
          

        
    }
}

export default withRouter(Login)
