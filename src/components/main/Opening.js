import React, { Component } from 'react';
import '../../styles/scss/Opening.scss';

import WelcomeScreen from '../parts/WelcomeScreen';
import TopNavBar from '../parts/TopNavBar';
import { ModalInput } from '../parts/ModalInput';
import MessageModal from '../parts/MessageModal';

class Opening extends Component {

   
    constructor(props) {
      super(props);
      this.state = {
        modalName: ''
      }
    }
    

    handleClickRegisterLogin = (e) => {
        const selectedModal = e.target.name;
        this.setState({
            modalName: selectedModal
        })
       
    }

    render() {
        return (
          <React.Fragment>
            <TopNavBar />
            <MessageModal />

            <ModalInput modalName={this.state.modalName}/>
    
            <div className="container mt-3">
              <WelcomeScreen />
            </div>

            <div className="access-buttons">
              <button type="button"
                  className="btn btn-primary register-opening"
                  name="Register"
                  data-toggle="modal"
                  onClick={this.handleClickRegisterLogin}
                  data-target='#genericModal' 
              >
                Register
              </button>
              <button type="button"
                  className="btn btn-primary ml-2 login-opening"
                  name="Login"
                  data-toggle="modal"
                  onClick={this.handleClickRegisterLogin}
                  data-target="#genericModal"
              >
                Login
              </button>
            </div>
          
          </React.Fragment>
        )
      }
}

export default Opening