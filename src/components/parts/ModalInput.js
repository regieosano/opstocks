import React, { Component } from 'react'

import Register from '../register/Register';
import Login from '../login/Login';

export class ModalInput extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    const modalInputShown =
     (this.props.modalName === 'Register') ?
        <Register /> : <Login />; 
    

    return (
      <div>
        <div className="modal fade"
           data-backdrop="static"
           data-keyboard="false"
           id="genericModal"
           role="dialog"
           
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <h5 className="mt-3 mx-auto">
               { this.props.modalName }
              </h5>
              <div className="modal-body">
               { modalInputShown }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalInput
