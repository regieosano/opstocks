import React, { Component } from 'react';
import RequestModal from '../modal/RequestModal';
import ItemEditModal from '../modal/ItemEditModal';


import '../../styles/scss/ProcessRequestModal.scss';

class ProcessRequestModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {},
            itemNo: 0
        }
    }

   
    handleItemEditSelect = (e) => {
        const index = parseInt(e.target.name);
        const selectedItem = this.props.arrayOfRequestedItems[index];
        this.setState({
            selectedItem,
            itemNo: index + 1
        })      
    }

    handleQtyApprovedEdit = (changedValue) => {
        this.props.arrayOfRequestedItems[this.state.itemNo - 1].qtyApproved = changedValue;
        this.setState({
             itemNo: 0
        })      
       
    }

    
    render() {
        const contentBody = (
            <div className="table-wrap">
              <table className="table table-fit table-sm table-hover table-fixed">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Qty</th>
                    <th scope="col">
                       <i className="fas fa-thumbs-up"></i></th>
                    <th scope="col">
                       <i className="fas fa-hand-holding"></i> 
                    </th>
                  </tr>
                </thead>
                <tbody>
                 {  
                    this.props.arrayOfRequestedItems.map((item, index) =>  <tr key={index}>
                                 <th scope="row" className="align-middle">{(index+1)+'.'}</th>
                   
                                 <td className="align-middle">
                                   <button
                                      type="button"
                                      className="btn btn-link"
                                      name={index}
                                      onClick={this.handleItemEditSelect}
                                      data-toggle="modal" 
                                      data-target="#itemEditModal"
                                     
                                   >
                                      {item.itemName}  
                                   </button>
                                 </td>
                  
                                 <td className="align-middle">
                                      {item.qtyRequested}
                                 </td>
                                 <td className="align-middle">
                                      {item.qtyApproved}
                                 </td>
                                 <td className="align-middle">
                                      {item.qtyGiven}
                                 </td>
                               </tr>
                    )
                 }
                </tbody>
              </table>
            </div>
        )
        return (
            <div>          
               <RequestModal 
                  contentBody={contentBody}
               />
               <ItemEditModal
                  selectedItem={this.state.selectedItem}
                  itemNo={this.state.itemNo}
                  handleQtyApprovedEdit={this.handleQtyApprovedEdit}
               />
            </div>
        );
    }
}

export default ProcessRequestModal;
