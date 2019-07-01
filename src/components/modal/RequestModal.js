import React, { Component } from 'react';
import { getRISNoYearAndMonth } from '../../utility/risNo';

class RequestModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
               <div className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    id={this.props.modalIdName}
                    data-backdrop="static"
                    data-keyboard="false"
                    aria-labelledby="myExtraRequestModal"
                    aria-hidden="true"
               >
                    <div className="modal-dialog modal-xl">
                       <div className="modal-content">
                          <div className="modal-header">
                             <h5 className="modal-title">{this.props.title}</h5>
                          </div>
                          <div className="modal-body">
                               {this.props.contentBody} 
                          </div>
                          <div className="modal-footer">
                                {this.props.contentFooter}
                          </div>
                       </div>
                    </div>
               </div>
            
        );
    }
}

export default RequestModal;
