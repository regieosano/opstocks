import React, { Component } from 'react';


class ItemQtySelectInputForm extends Component {
    
    constructor(props) {
        super(props);
        this.itemSelectRef = React.createRef();
        this.qtyInputRef = React.createRef();
        this.itemRequestedObject = {};
    }

    handleInputEventAction = (e) => { 
    
        e.preventDefault();
    
        if (e.target.id === 'itemObject') { 
           const itemArrayValue = e.target.value.split('*');
           this.itemRequestedObject = {
              itemCode: itemArrayValue[0],
              itemCategory: {
                categoryName: itemArrayValue[1] 
              },
              itemName: itemArrayValue[2],
              currentQty: parseInt(itemArrayValue[3], 10),
              unit: itemArrayValue[4],
              isAvailable: itemArrayValue[5],
           }
          
        }  
    
        if (e.target.id ===  'qtyRequested') {
           const qtyRequested = e.target.value; 
           if (/^[1-9][0-9]*$/.test(qtyRequested)) {
              const qtyRequestedToInt = parseInt(qtyRequested, 10);
              this.props.handleItemRequestedObjectCreation(this.itemRequestedObject, true, qtyRequestedToInt)
           } else {
            this.props.handleItemRequestedObjectCreation(this.itemRequestedObject, false)    
           }
        }
    }

    clearInputFields() {
        this.itemSelectRef.current.selectedIndex = 0;
        this.qtyInputRef.current.value = '';
    }

    render() {

        return (
            <div>
               <form noValidate>
                 <div className="form-group">
                    <label>Item</label>
                       <select className="custom-select"
                               id="itemObject"
                               defaultValue={0}
                               onChange={this.handleInputEventAction}
                               ref={this.itemSelectRef}
                       >
                       <option disabled value="0">Choose...</option>
                       {this.props.itemsForRequest.map(item => 
                       <option key={item._id} 
                               value={             
                                   item.itemCode + '*' +
                                   item.itemCategory.categoryName + '*' +
                                   item.itemName + '*' +
                                   item.currentQty + '*' +
                                   item.unit + '*' +
                                   item.isAvailable 
                               }       
                        >
                               {item.itemName}
                       </option>
                       )}
                       </select>
                  </div>
                 <div className="form-group">
                    <label>Quantity</label>
                    <input type="text" 
                           className="form-control"
                           id="qtyRequested"
                           placeholder="Enter Qty"
                           onKeyUp={this.handleInputEventAction}
                           ref={this.qtyInputRef}
                    />
                 </div>
               </form> 
                   
            </div>
        );
    }
}

export default ItemQtySelectInputForm;
