import React, { Component } from 'react';
import { getRISNoYearAndMonth } from '../../utility/risNo';

import '../../styles/scss/UserRequestList.scss';

class UserRequestList extends Component {

    constructor(props) {
      super(props);
      this.state = {
         wasEdited: false
      }
    }

    handleDeleteItemEventAction = (item) => {
      if (confirm("Are you sure you want to DELETE this ITEM? " + "\n\n" +
            item.item['itemName']
         ))
         {
           this.props.handleSelectedItemForDeletion(item);
         } 
         else
         {

         } 
    }

    handleSelectItemEventAction = 
    (item) => 
          this.props.handleSelectedItemQtyForUpdate(item)

    render() {  
        const currentDate = new Date();
        const risDate = ' Dated ' + currentDate.toLocaleDateString("en-US");

        const requestedItems = (
          <div>
            <span className="mt-2 risNoColor">
               {
                 'RIS No.' + getRISNoYearAndMonth()
                           + (this.props.newRISNo + 1)
                  + risDate         
               }
            </span>
            <table 
               className="table table-fit table-sm table-striped table-hover table-fixed"
            >
            <thead>
             <tr>
               <th scope="col">#</th>
               <th scope="col">Item</th>
               <th scope="col">Qty</th>
               <th scope="col"><i className="fa fa-th"></i></th>
               <th scope="col">x</th>
             </tr>
            </thead>
            <tbody>
            { this.props.requestedItems.map((item, index) =>      
               <tr key={index}>
                  <th scope="row" className="align-middle">{(index+1)+'.'}</th>
                  <td className="align-middle">
                      <span className="text-left">{item.item['itemName']}</span>
                  </td>
                  <td className="align-middle">
                     <button
                         type="button"
                         className="btn btn-link"
                         data-toggle="modal" 
                         data-target="#qtyItemChangedModal"
                         onClick={this.handleSelectItemEventAction.bind(this,
                            {
                               index,
                               itemName: item.item['itemName'],
                               qtyRequested: item.qtyRequested
                            }
                           )
                         }
                     >
                         <span className="text-right">
                            {item.qtyRequested}
                         </span>
                     </button>    
                  </td>
                  <td className="align-middle">{item.item['unit']}</td>
                  <td className="align-middle">
                     <span className="trash-effects">
                        <i className="fa fa-trash"
                            aria-hidden="true"
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
                </tr>
             )
            }
          
        
            </tbody>
           </table>
          </div> 
        )
        
        return (
          <div>
            {requestedItems}          
          </div>
        
          
        );
    }
}

export default UserRequestList;
