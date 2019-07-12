import React, { Component } from 'react';
import '../../styles/scss/RequestModal.scss';

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
                             <p className="modal-title titleFormat">
                               {
                                this.props.isDisplayRISNo ? 
                                     <span>
                                       {
                                         this.props.title + " RIS No. " +
                                         this.props.requestNo
                                       }
                                     </span>    
                                     :   this.props.title + " " 
                               
                               }
                               {
                                   this.props.isDisplayDate ?
                                     <span className="datedFormat">
                                      {"Dated " + this.props.dateOfRequest}
                                     </span>
                                     : <span></span>
                               }
                              
                             </p>                              
                           
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
