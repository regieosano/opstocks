import React, { Component } from 'react'
import axios from 'axios';

import '../../styles/scss/ViewRequestModal.scss'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateRequest } from './../../actions/requestsAction';

import RequestModal from '../modal/RequestModal';
import ItemQtySelectInputForm from '../form/ItemQtySelectInputForm';

import QtyItemChangedSavedModal from '../modal/QtyItemChangedSavedModal';


class ViewRequestModal extends Component {

  constructor(props) {
    super(props);
    this.itemQtySelectInputFormComp = React.createRef();
    this.state = {
      indexNo: 0,
      itemsForRequest: [],
      itemRequestedObject: {},
      hasForUpdate: false,
      itemNameForUpdate: '',
      qtyRequestedForUpdate: 0
    }
  }

  componentWillMount() {
    axios.get('http://localhost:7777/opstocks/api/items')
    .then(response => this.handleStoreForItemsForRequests(response.data))
    .catch(err => alert('Something went wrong... ' + err))
  }

  
  handleStoreForItemsForRequests = (itemsForRequest) => {
    this.setState({
      itemsForRequest
    })
  }

  handleItemRequestedObjectCreation = (itemRequestedObject, validEntries, qtyRequestedForUpdate=0) => {
    if (validEntries) {
      this.setState(
        {
          itemRequestedObject,
          validEntries,
          qtyRequestedForUpdate
        }
      )
    } else {
      this.setState(
        {
          validEntries,
        }
      )
    }
  }

  handleAddAnotherItemInTheRequest = () => {

    const itemExist = this.props.requestedItems.find(item => item.item['itemName'] === this.state.itemRequestedObject['itemName'])

    if (itemExist) {
         alert('This ITEM was SELECTED already!');
    } else {
         const item = {
           item: this.state.itemRequestedObject,
           itemIsAllowed: true,
           qtyRequested: parseInt(this.state.qtyRequestedForUpdate, 10),
           qtyApproved: parseInt(this.state.qtyRequestedForUpdate, 10),
           qtyGiven: parseInt(this.state.qtyRequestedForUpdate, 10),
           qtyBalance: 0
         }

         this.props.requestedItems.push(item);
         this.itemQtySelectInputFormComp.current.clearInputFields();
         this.setState({
               hasForUpdate: true,
               validEntries: false 
         })
    }
    
  }

  handleDeleteItemEventAction = (item) => { 
    if (confirm("Are you sure you want to DELETE this ITEM? " + "\n\n" +
          item.item['itemName']
       ))
       {
          this.props.requestedItems.splice(item.index, 1);
          this.setState({
            hasForUpdate: true,
          })    
       } 
       else
       {

       } 
  }
  
  handleUpdatedItem = (updatedQtyValue) => {
    this.props.requestedItems[this.state.indexNo]
        .qtyRequested = updatedQtyValue
    this.setState({
         indexNo: 0,
         hasForUpdate: true,
         itemNameForUpdate: '',
         qtyRequestedForUpdate: 0, 
    })    
  }

  handleUpdateOfAddItemAndItemQtyInDB = () => {
    this.props.updateRequest(this.props.requestedItems, this.props.requestNo, this.props.xauthtoken);

    this.setState({ hasForUpdate: false })
    alert('Item / Quantity CHANGED or DELETION was UPDATED and RECORDED.')
  }

  handleCloseOfItemAddUpdate = () => {
    this.itemQtySelectInputFormComp.current.clearInputFields();
    this.setState(
      { 
        hasForUpdate: false
      }
    )
  }
  
  handleSelectItemEventAction = 
    (item) => {
       this.setState({
         indexNo: item.index,
         itemNameForUpdate: item.itemName,
         qtyRequestedForUpdate: item.qtyRequested, 
         buttonCloseOnly: <div></div>
       })
  }
 
  render() {
   
    const { indexNo, 
            itemNameForUpdate,
            qtyRequestedForUpdate,
            validEntries
          } = this.state;


    const contentBody =
      <div>
        {!this.props.isRequestSubmittedAlready ? 
               <ItemQtySelectInputForm 
                  ref={this.itemQtySelectInputFormComp}
                  itemsForRequest={this.state.itemsForRequest}
                  currentSelectedValue={this.state.currentSelectedValue}
                  handleItemRequestedObjectCreation={this.handleItemRequestedObjectCreation}
               />
               :
               <div></div>}
        <table className="table table-fit table-sm table-striped table-hover table-fixed">
          <thead>
             <tr>
               <th scope="col">#</th>
               <th scope="col">Items</th>
               <th scope="col">Qty</th>
               <th scope="col"><i className="fa fa-th"></i></th> 
               <th scope="col">
               { 
                 !this.props.isRequestSubmittedAlready ? 'Del' 
                 : <i className="fas fa-thumbs-up"></i>
               }
               </th>   
             </tr>
          </thead>
          <tbody>
          {
            this.props.requestedItems.map((item, index) => 
              <tr className="col-12 changeAlignment" key={index}> 
                <th scope="row"  className="align-middle">{index+1}.</th>
                <td className="align-middle">
                    {item.item['itemName']}
                </td>
                <td className="align-middle"> 
                 {
                   !this.props.isRequestSubmittedAlready ?
                   (
                     <button
                       type="button"
                       className="btn btn-link"
                       data-toggle="modal" 
                       data-target="#qtyItemChangedSavedModal"
                       onClick={this.handleSelectItemEventAction.bind(this,
                           {
                             index,
                             itemName: item.item['itemName'],
                             qtyRequested: item.qtyRequested
                           }
                         )
                       }
                
                     >
                         {item['qtyRequested']}
              
                     </button>
                   ) : (
                         item['qtyRequested']
                   )       
          
                 }
                </td> 
                <td className="align-middle">{item.item['unit']}</td>
                {
                   !this.props.isRequestSubmittedAlready ?
                     (
                       <td className="align-middle">
                        <span className="trash-effects">
                          <i className="fa fa-trash"
                             onClick={this.handleDeleteItemEventAction.bind(this,
                               {
                                   index,
                                   item: item.item,    
                               }
                              )
                            }
                          >
                          </i>
                        </span>
                       </td>
                     ) : (
                       <td className="align-middle">{item['qtyApproved']}</td>
                     )
                }
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
 

      const buttonsForNotSubmitted = 
         <div>
            <button type="button"
                    className="btn btn-primary ml-2 btn-lg"
                    disabled={!validEntries}
                    data-target="#addNewItemInSavedRequestModal"
                    data-toggle="modal"
                    onClick={this.handleAddAnotherItemInTheRequest}               
            >
                <span><i className="fa fa-plus"></i></span>
            </button>
            <button type="button"
                    className="btn btn-primary ml-2"
                    disabled={!this.state.hasForUpdate ? true : false}
                    onClick={this.handleUpdateOfAddItemAndItemQtyInDB}
            >
                <span><i className="fa fa-database"></i></span>
            </button>
            <button type="button"
                    className="btn btn-primary ml-2"                 
            >
                <span><i className="fa fa-paper-plane" aria-hidden="true"></i></span>
            </button>
            <button type="button"
                    className="btn btn-danger ml-2"
                    onClick={this.handleCloseOfItemAddUpdate}
                    data-dismiss="modal"
            >
                   Close
            </button> 
         </div>
     
      const buttonCloseOnly = <button type="button"
                                      className="btn btn-danger ml-2"
                                      data-dismiss="modal"
                              >
                                  Close
                              </button> 

      const contentFooter = 
      <div>
        { this.props.isRequestSubmittedAlready ? buttonCloseOnly:
          buttonsForNotSubmitted 
        }
      </div>    
    
    return (
      <div>
           <RequestModal 
              contentBody={contentBody}
              contentFooter={contentFooter}
              title={'RIS No. ' + this.props.requestNo}
              dateOfRequest={this.props.dateOfRequest}
              modalIdName={'yRequestModal'}
              isDisplayDate={true}   
           />   
           <QtyItemChangedSavedModal
              handleUpdatedItem={this.handleUpdatedItem}
              indexNo={indexNo}
              itemName={itemNameForUpdate}
              qtyRequestedForUpdate={qtyRequestedForUpdate} 
           
           />   
      </div>
        
    )
  }
}

ViewRequestModal.propTypes = {
  updateRequest: PropTypes.func.isRequired,
  requestNo: PropTypes.string.isRequired,
  dateOfRequest: PropTypes.string.isRequired, 
  xauthtoken: PropTypes.string.isRequired,
  requestedItems: PropTypes.array.isRequired,
  isRequestSubmittedAlready: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request
})

export default connect(mapStateToProps, { updateRequest })(ViewRequestModal);

