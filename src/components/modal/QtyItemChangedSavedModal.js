import React, { Component } from 'react';
import '../../styles/scss/QtyItemChangedSavedModal.scss';

class QtyItemChangedSavedModal extends Component {
    constructor(props) {
        super(props);
      
    }

    handleUpdateOfQtyValue = () => {
        const updatedQtyRequested = parseInt(this.refs.updatedQtyRequested.value)
        this.props.handleUpdatedItem(updatedQtyRequested);
        this.refs.itemName.value = '';
        this.refs.updatedQtyRequested.value = '';
    }


    render() {    
        return (
            <div className="modal fade"
                 tabIndex="-1"
                 role="dialog"
                 data-backdrop="static"
                 data-keyboard="false"
                 id="qtyItemChangedSavedModal"
            >
             <div className="modal-dialog">
                <div className="modal-content modalBackdropForItemSavedChanged">
                  <div className="modal-header">
                    <h5 className="modal-title">
                       Changed Quantity Value
                    </h5>
                  </div>
                  <div className="modal-body">
                     <form noValidate>
                        <div className="form-group">
                          <label>{"Item # " + (parseInt(this.props.indexNo) + 1)}</label>
                          <input type="text" 
                                 className="form-control"
                                 placeholder={this.props.itemName}
                                 ref="itemName"
                                 readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Qty Requested</label>
                          <input type="number" 
                                 className="form-control"
                                 placeholder={this.props.qtyRequestedForUpdate}
                                 ref="qtyRequested"
                                 readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Enter New Quantity</label>
                          <input type="number" 
                                 className="form-control"
                                 ref="updatedQtyRequested"
                          />
                        </div>
                     </form> 
                  </div>
                  <div className="modal-footer">    
                     <button type="button"
                             className="btn btn-primary"
                             onClick={this.handleUpdateOfQtyValue}
                             data-dismiss="modal"
                     >
                             
                         Ok
                     </button>
                     <button type="button"
                             className="btn btn-danger"
                             data-dismiss="modal"
                             onClick={() => {}}
                     >
                         Cancel
                     </button>
                 </div>
                </div>
              </div>
            </div>
        );
    }
}


export default QtyItemChangedSavedModal;


