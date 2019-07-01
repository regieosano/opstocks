import React, { Component } from 'react';

import '../../styles/scss/ItemEditModal.scss';

class ItemEditModal extends Component {

    constructor(props) {
        super(props);
    }

    handleEditedItem = () => {
        const changedValue = this.refs.qtyApproved.value;
        this.props.handleQtyApprovedEdit(changedValue);
    }

    render() {
        return (
            <div>
             <div className="modal fade"
                     tabIndex="-1"
                     role="dialog"
                     id="itemEditModal"
             >
                <div className="modal-dialog">
                  <div className="modal-content modalBackdropForItemEdit">
                     <div className="modal-header">
                       <h5 className="modal-title">Edit</h5>
                     </div>
                     <div className="modal-body">
                         <form noValidate>
                             <div className="form-group">
                                <label>{`Item #${this.props.itemNo}`}</label>
                                <p>
                                   <font className="itemColor">
                                      {this.props.selectedItem['itemName'] || "No Item Yet"} 
                                   </font>
                               
                                </p>
                             </div>
                             <div className="form-group">
                                <label>Qty Requested</label>
                                <input type="number" 
                                       className="form-control"
                                       ref="qtyRequested"
                                       defaultValue={this.props.selectedItem['qtyRequested']}
                                       
                                />
                             </div>
                             <div className="form-group">
                                 <label>Qty Approved</label>
                                 <input type="number" 
                                        className="form-control"
                                        ref="qtyApproved"
                                        defaultValue={this.props.selectedItem['qtyApproved']}
                                 />
                             </div>
                            
                         </form> 
                     </div>
                     <div className="modal-footer">
                        <button type="button"
                                className="btn btn-primary"
                                onClick={this.handleEditedItem}
                                data-dismiss="modal"
                        >
                                Save
                        </button>
                        <button type="button"
                                className="btn btn-secondary"                data-dismiss="modal">
                                Cancel
                        </button>
                     </div>
                   </div>
                 </div>
              </div>
             </div>
        );
    }
}

export default ItemEditModal;
