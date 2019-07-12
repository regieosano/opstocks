import React, { Component } from 'react'
import axios from 'axios';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addRequest } from './../../actions/requestsAction';

import UserRequestList from '../user/UserRequestList';
import { getRISNoYearAndMonth } from '../../utility/risNo';

import ItemQtySelectInputForm from '../form/ItemQtySelectInputForm';
import RequestModal from '../modal/RequestModal';
import QtyItemChangedModal from '../modal/QtyItemChangedModal';
import YesNoConfirmModal from '../parts/YesNoConfirmModal';

import '../../styles/scss/NewRequestModal.scss'

class NewRequestModal extends Component {

  constructor(props) {
    super(props);
    this.itemQtySelectInputFormComp = React.createRef();
    this.state = {
       risNo: 0,
       indexNo: 0,
       title: 'New Request',
       itemRequestedObject: {},
       itemNameForUpdate: '',
       qtyRequestedForUpdate: 0,
       hasBaseRISNoAlready: false,
       itemsForRequest: [],
       itemsSelectedInTheRequest: [],
       tempItemsSelectedInTheRequest: [],
       validEntries: false
    }  
  }
 
  componentDidMount(){ 
    axios.get('http://localhost:7777/opstocks/api/items')
         .then(response => this.handleStoreForItemsForRequest(response.data))
         .catch(err => alert('Something went wrong... ' + err))
 
  }

  componentWillReceiveProps() {
    if (this.props.baseRISNo !== '') {
      if (!this.state.hasBaseRISNoAlready) {
        const risNo = (this.props.baseRISNo).substring(6);
        let risNoToNumber = parseInt(risNo, 10);
        this.setState({ 
           risNo: risNoToNumber,
           hasBaseRISNoAlready: true
         }
        )
      }     
    } else {
      // TODO If there are no record(s)

    }        
  }

  handleStoreForItemsForRequest = (itemsForRequest) => {
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

  handleSaveNewRequest = (isSubmit) => {
    let risNoToNumber = this.state.risNo;
    const risNoInc = ++risNoToNumber;
      
    this.setState({
       risNo: risNoInc
    });
    const newRISNo =  getRISNoYearAndMonth() + (risNoInc) 
    
    this.props.addRequest(this.props.officeName,
                          newRISNo,
                          this.state.itemsSelectedInTheRequest,
                          isSubmit,
                          this.props.xauthtoken)
 
    if (isSubmit) {
       alert("New request SAVED and SUBMITTED to AMO.")
    } else {
       alert("New request SAVED and ready for SUBMISSION.")
    }      
    this.clearRequestItemsArraysAndInputControls();
   
  }

  handleCreateItemRequest = () => { 

    const itemExist = this.state.itemsSelectedInTheRequest.find(item => item.item['itemName'] === this.state.itemRequestedObject['itemName'])

    if (itemExist) {
       alert('This ITEM was SELECTED already!');
    } else {
      this.state.tempItemsSelectedInTheRequest.push(
        {
          item: this.state.itemRequestedObject,
          itemIsAllowed: true,
          qtyRequested: parseInt(this.state.qtyRequestedForUpdate, 10),
          qtyApproved: parseInt(this.state.qtyRequestedForUpdate, 10),
          prevCurrentQty: this.state.itemRequestedObject['currentQty'],
          qtyGiven: parseInt(this.state.qtyRequestedForUpdate, 10),
          qtyBalance: 0
        }
      );
     
      this.itemQtySelectInputFormComp.current.clearInputFields();
      this.setState({
        itemsSelectedInTheRequest: this.state.tempItemsSelectedInTheRequest,
        validEntries: false
      })  
    }   
     
  }

  handleSelectedItemQtyForUpdate = (item) => { 
     this.setState({
        indexNo: item.index,
        itemNameForUpdate: item.itemName,
        qtyRequestedForUpdate: item.qtyRequested
     })
  }

  handleSelectedItemForDeletion = (item) => {
      this.state.tempItemsSelectedInTheRequest.splice(item.index, 1);
      this.setState({
         itemsSelectedInTheRequest: this.state.tempItemsSelectedInTheRequest
      })    
  }

  handleUpdatedItem = (updatedQtyValue) => {
      this.state.itemsSelectedInTheRequest[this.state.indexNo]
          .qtyRequested = updatedQtyValue
      this.setState({
           indexNo: 0,
           itemNameForUpdate: '',
           qtyRequestedForUpdate: 0
      })
  }

  clearRequestItemsArraysAndInputControls = () => {
    this.itemQtySelectInputFormComp.current.clearInputFields();
    this.setState({
      tempItemsSelectedInTheRequest: [],
      itemsSelectedInTheRequest: [],
      isSavedCancelled: true,
      validEntries: false
    }, () => {
      // Todo a callback call after setState
    })
  }

    
  render() { 
      const { title,
              risNo,
              indexNo,
              itemsSelectedInTheRequest, 
              itemNameForUpdate,
              qtyRequestedForUpdate } = this.state;
            
      const contentBody = (
      <div>   
        <ItemQtySelectInputForm
            ref={this.itemQtySelectInputFormComp}
            itemsForRequest={this.state.itemsForRequest}
            handleItemRequestedObjectCreation={this.handleItemRequestedObjectCreation}
        />
        
        <UserRequestList 
            requestedItems={itemsSelectedInTheRequest}
            newRISNo={risNo}
            handleSelectedItemQtyForUpdate={this.handleSelectedItemQtyForUpdate}
            handleSelectedItemForDeletion={this.handleSelectedItemForDeletion}
        />
      </div>
     
    );

    const contentFooter = (
        <div>
           <button type="button"
                   className="btn btn-primary"
                   data-toggle="modal"
                   data-dismiss="modal"
                   data-target="#yesNoConfirmModal"
                   disabled={this.state.tempItemsSelectedInTheRequest.length === 0}
           >
                   Save
           </button>
           <button type="button"
                   className="btn btn-primary ml-1"
                   onClick={this.handleCreateItemRequest}
                   disabled={!this.state.validEntries}
           >
                   Create
           </button>
           <button type="button"
                   className="btn btn-danger ml-1"
                   data-dismiss="modal"
                   onClick={this.clearRequestItemsArraysAndInputControls}
           >
                   Cancel
           </button>
        </div>
    );
  

    return (
      <div>
         <RequestModal 
            contentBody={contentBody}
            contentFooter={contentFooter}
            title={title}
            modalIdName={'xRequestModal'}
            isDisplayDate={false}
         />
         <YesNoConfirmModal 
            handleSaveNewRequest={this.handleSaveNewRequest}
            risNo={risNo}
         />
         <QtyItemChangedModal
            handleUpdatedItem={this.handleUpdatedItem}
            indexNo={indexNo}
            itemName={itemNameForUpdate}
            qtyRequestedForUpdate={qtyRequestedForUpdate} 
            handleSelectedItemQtyForUpdate={this.handleSelectedItemQtyForUpdate}
         /> 
      </div>
    )
  }
}


NewRequestModal.propTypes = {
  addRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  officeName: PropTypes.string.isRequired,
  xauthtoken: PropTypes.string.isRequired,
  baseRISNo: PropTypes.string.isRequired

}

const mapStateToProps = (state) => ({
  request: state.request
})

export default  connect(mapStateToProps, { addRequest })(NewRequestModal);
