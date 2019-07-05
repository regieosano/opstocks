import React, { Component } from 'react';
import RequestModal from '../modal/RequestModal';
import ItemEditModal from '../modal/ItemEditModal';

import axios from 'axios';

import '../../styles/scss/ProcessRequestModal.scss';

class ProcessRequestModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {
                item: {
                    item: {
                        itemName: 'NO ITEM',
                    },
                    qtyRequested: 0,
                    qtyApproved: 0,
                }
            },
            hasForUpdate: false,
            itemNo: 0
        }
       
    }
   
    handleItemEditSelect = (selectedItem, index) => {  
        this.setState({
            selectedItem,
            itemNo: index + 1
        })    
    }

    handleUpdateOfAddItemAndItemQtyInDB = () => { 

        let config = {
            headers: {
              'x-auth-token': this.props.xauthtoken,
            }
        }

        axios.put(`http://localhost:7777/opstocks/api/request/no/${this.props.requestNo}`,  config)
        .then((response) => {
              console.log(response.data['items']);
         })
         .catch((err) => {
               alert('Something went wrong... ' + err);
         })

         this.setState({
            hasForUpdate: false
         })      
    }

    handleQtyApprovedEdit = (changedValue) => {
        this.props.arrayOfRequestedItems[this.state.itemNo - 1].qtyApproved = changedValue;
        this.setState({
             hasForUpdate: true,
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
                  </tr>
                </thead>
                <tbody>
                 {  
                    this.props.arrayOfRequestedItems.map((item, index) =>  <tr key={index}>
                                 <th scope="row" className="align-middle">{(index+1)+'.'}</th>
                   
                                 <td className="align-middle">
                                      {item.item['itemName']}  
                                 </td>
                                 <td className="align-middle">
                                     <button
                                         type="button"
                                         className="btn btn-link"
                                         onClick={() => this.handleItemEditSelect(item, index)}
                                         data-toggle="modal" 
                                         data-target="#itemEditModal"
                                     >
                                         {item.qtyRequested}
                                     </button>
                                 </td>
                                 <td className="align-middle">
                                      {item.qtyApproved}
                                 </td>                               
                               </tr>
                    )
                 }
                </tbody>
              </table>
            </div>
        )

        const contentFooter = (
         <div>
            <button type="button"
                    className="btn btn-primary ml-2"
                    disabled={!this.state.hasForUpdate ? true : false}
                    onClick={this.handleUpdateOfAddItemAndItemQtyInDB}
            >
                <span><i className="fa fa-database"></i></span>
            </button>
            <button type="button"
                    className="btn btn-danger ml-2"
                    data-dismiss="modal"
            >
                   Close
            </button> 
         </div> )

        return (
            <div>          
               <RequestModal
                  title={this.props.officeName}
                  contentBody={contentBody}
                  contentFooter={contentFooter}
                  modalIdName={'zRequestModal'}
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
