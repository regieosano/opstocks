import React, { Component } from 'react';

import '../../styles/scss/ItemEditModal.scss';

class ItemEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isQtyEditedValValid: false
        }
    }

    handleCancelEditItem = () => {
        this.refs.qtyEdited.value = '';
        this.setState({
            isQtyEditedValValid: false
        }) 
    }

    handleEditedItem = () => { 
        const changedValue = parseInt(this.refs.qtyEdited.value, 10);
        this.refs.qtyEdited.value = '';
        this.props.handleQtyApprovedEdit(changedValue);
    }

    handleEntryInput = (e) => {
        const qtyEditedValue = e.target.value;
        const boolValue = (/^[1-9][0-9]*$/.test(qtyEditedValue))
        this.setState({
                isQtyEditedValValid: boolValue
        })     
    }

    render() { 
        return (
            <div>
             <div className="modal fade"
                  tabIndex="-1"
                  role="dialog"
                  id="itemEditModal"
                  data-backdrop="static"
                  data-keyboard="false"
             >
                <div className="modal-dialog">
                  <div className="modal-content modalBackdropForItemEdit">
                     <div className="modal-header">
                       <h5 className="modal-title">Edit</h5>
                     </div>
                     <div className="modal-body">
                         <form noValidate>
                             <div className="form-group">
                                <label>{`Item # ${this.props.itemNo}`}</label>
                                <p>
                                   <font className="itemColor">
                                      {
                                        this.props.selectedItem.item['itemName']
                                      } 
                                   </font>
                                   <br/>
                                   <font className="stockFormat">
                                    {
                                       'Stock-On-Hand -' + ' ' + 
                                       this.props.selectedItem.item['currentQty'] + ' ' +
                                       this.props.selectedItem.item['unit']
                                    }
                                   </font>               
                                </p>
                              
                             </div>
                            
                             <div className="form-group">
                                <label>Qty Requested</label>
                                <input type="text" 
                                       className="form-control"
                                       ref="qtyRequested"
                                       disabled={true}
                                       placeholder={this.props.selectedItem['qtyRequested']}
                                       
                                />
                             </div>
                             <div className="form-group">
                                 <label>Enter Corrected Approved Quantity</label>
                                 <input type="text" 
                                        className="form-control"
                                        ref="qtyEdited"
                                        onKeyUp={this.handleEntryInput}
                                 />
                             </div>
                         </form> 
                     </div>
                     <div className="modal-footer">
                        <button type="button"
                                className="btn btn-primary"
                                onClick={this.handleEditedItem}
                                disabled={!this.state.isQtyEditedValValid}
                                placeholder={'Type new quantity'}
                                data-dismiss="modal"
                        >
                                Ok
                        </button>
                        <button type="button"
                                className="btn btn-danger"                data-dismiss="modal"
                                onClick={this.handleCancelEditItem}
                        >
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
