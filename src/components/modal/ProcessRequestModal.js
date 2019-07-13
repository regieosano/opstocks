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

    handleItemDeleteSelect = (indexForDeletion) => {
        // Destructure props property
        const { arrayOfRequestedItems } = this.props;

        // Declare constant variables
        const itemForDeletion = arrayOfRequestedItems[indexForDeletion];
        const isItemAllowed = itemForDeletion.itemIsAllowed;

        // Toggle boolean value for item if ALLOWED or NOT 
        itemForDeletion.itemIsAllowed = !isItemAllowed;

        // setState to update state values and render 
        this.setState(
           { 
              hasForUpdate: true,
           }
        )
    }
   
    handleItemEditSelect = (selectedItem, index) => {  
        this.setState({
            selectedItem,
            itemNo: index + 1
        })
       
    }

    handleUpdateOfAddItemAndItemQtyInDB = () => { 

        // Destructure props properties
        const { 
                arrayOfRequestedItems, 
                officeName,
                xauthtoken,
                requestNo,
                setWasInitiallyUpdatedToTrue
              }
                = this.props;

        // Update the currentQty of the Item
        arrayOfRequestedItems.forEach(item => {
            item.itemIsAllowed ?
               item.item['currentQty'] = item.prevCurrentQty - item.qtyApproved :
               item.item['currentQty'] += item.qtyApproved
        })

        let config = {
            headers: {
              'x-auth-token': xauthtoken,
            }
        }

        axios.put(`http://localhost:7777/opstocks/api/request/no/${requestNo}`,
        {
            requestNo: requestNo,
            reqOffice: officeName,
            items: arrayOfRequestedItems,
            wasInitiallyUpdated: true,
            isRequestSubmittedAlready: true,
            isRequestCompletedAndServed: false
        },
        
        config
        
        )
        .then((response) => {
              alert('Database UPDATED per CHANGES made.')
              setWasInitiallyUpdatedToTrue()
              this.setState({
                hasForUpdate: false
              })      
         })
        .catch((err) => {
               alert('Something went wrong... ' + err);
         })

        
    }

    handleQtyApprovedEdit = (changedValue) => {
        // Destructure props and state properties
        const { arrayOfRequestedItems } = this.props;
        const { itemNo } = this.state;
       
        // Get specific item for changed qty approval
        const itemForChangedQty = arrayOfRequestedItems[itemNo - 1];

        // Update field values per approved qty
        itemForChangedQty.qtyApproved = changedValue;
        itemForChangedQty.qtyGiven = changedValue;

        // Update the currentQty of the Item
        itemForChangedQty.item['currentQty'] 
                = itemForChangedQty.prevCurrentQty - changedValue
        
        // setState for rendering and update of states        
        this.setState({
             hasForUpdate: true,
             itemNo: 0
        })         
    }

    handleCloseOfProcessRequestModal = () => {
        if (this.state.hasForUpdate || (!this.props.wasInitiallyUpdated)) {
            alert('There are CHANGES made, UPDATE is needed. All will be DISCARDED.')
        }
        this.setState({
            hasForUpdate: false,
        })         
    }
    
    render() { 

        const { arrayOfRequestedItems } = this.props;

        const contentBody = (
            <div className="table-wrap">
              <table className="table table-fit table-sm table-hover table-fixed">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">
                       <i className="fa fa-shopping-basket"></i>
                    </th>
                    <th scope="col">
                       <i className="fa fa-th"></i>
                    </th>
                    <th scope="col">
                       <i className="fa fa-archive"></i>
                    </th> 
                    <th scope="col">
                       <i className="fas fa-thumbs-up"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                 {  
                    arrayOfRequestedItems.map((item, index) =>  <tr key={index} >
                                 <th scope="row" className={item.itemIsAllowed ?
                                    "align-middle": "align-middle strikeFormat"}>{(index+1)+'.'}</th>
                   
                                 <td className={item.itemIsAllowed ?
                                    "align-middle": "align-middle strikeFormat"}
                                 >
                                      {item.item['itemName']}  
                                 </td>
                                 <td className="align-middle">
                                     <button
                                         type="button"
                                         className="btn btn-link"
                                         disabled={!item.itemIsAllowed}
                                         onClick={() => this.handleItemEditSelect(item, index)}
                                         data-toggle="modal" 
                                         data-target="#itemEditModal"
                                     >
                                         <span className={item.itemIsAllowed ?
                                            "qtyReqFormat": "qtyReqFormat strikeFormat"
                                         }>
                                            {item.qtyRequested}
                                         </span>
                                     </button>
                                 </td>
                                 <td className={item.itemIsAllowed ?
                                    "align-middle unitFormat": "align-middle unitFormat strikeFormat"}
                                 >    
                                         {item.item['unit']}
                                 </td>        
                                 <td className="align-middle stockFormat">
                                      {item.itemIsAllowed ? item.prevCurrentQty - item.qtyApproved: item.prevCurrentQty}
                                 </td>        
                                 <td className={item.itemIsAllowed ?
                                    "align-middle approvedFormat": "align-middle approvedFormat strikeFormat"}>
                                      {item.qtyApproved}
                                 </td> 
                                 <td className={item.itemIsAllowed ?
                                    "align-middle deleteFormat": "align-middle undoFormat strikeFormat"}
                                     onClick={() => this.handleItemDeleteSelect(index)}
                                 >
                                     <span>{item.itemIsAllowed ? 'X': <i className="fas fa-undo"></i>}</span>
                                 </td>                                                
                    </tr>
                    )
                 }
                </tbody>
              </table>
            </div>
        )

        const updateButtonSave1 = (
              <button type="button"
                      className="btn btn-primary btn-lg ml-2"
                      onClick={this.handleUpdateOfAddItemAndItemQtyInDB}
              >
                   <span><i className="fa fa-database"></i></span>
              </button>
        )

        const updateButtonSave2 = (
            <button type="button"
                    className="btn btn-primary btn-lg ml-2"
                    disabled={!this.state.hasForUpdate ? true : false}
                    onClick={this.handleUpdateOfAddItemAndItemQtyInDB}
            >
                 <span><i className="fa fa-database"></i></span>
            </button>
      )

        const contentFooter = (
         <div>
            <div>
                  <button type="button"
                          className="btn btn-success"
                          data-dismiss="modal"
                  >
                          Finished
                  </button> 
                  { this.props.wasInitiallyUpdated ? updateButtonSave2: updateButtonSave1 }
                  <button type="button"
                          className="btn btn-danger ml-2"
                          onClick={this.handleCloseOfProcessRequestModal}
                          data-dismiss="modal"
                  >
                          Close
                  </button> 
            </div>
          </div>)
        

        return (
            <div>          
               <RequestModal
                  title={this.props.officeName}
                  requestNo={this.props.requestNo}
                  contentBody={contentBody}
                  contentFooter={contentFooter}
                  modalIdName={'zRequestModal'}
                  isDisplayRISNo={true}
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
