import React, { Component } from 'react';
import { UserNavBar } from './../parts/UserNavBar';
import ProcessRequestModal from '../modal/ProcessRequestModal';
import axios from 'axios';
import '../../styles/scss/RequestsForProcessing.scss';

class RequestsForProcessing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayOfRequestForProcess: [],
            arrayOfRequestedItems: [],
            officeName: '',
            requestNo: '',
            wasInitiallyUpdated: false,
            indexNo: 0,
            xauthtoken: ''
        }
    }
    
    componentDidMount() {
      const spear = this.props.location['state'];
      this.handleStoreArrayOfRequestAndToken(spear['arrow'], spear['shield']);
    }

    handleStoreArrayOfRequestAndToken = (arrayOfRequestForProcess, xauthtoken) => {
        this.setState({
            arrayOfRequestForProcess,
            xauthtoken
        })
      
    }

    handleStoreOfRequestedItemsAndOffice = (arrayOfRequestedItems, officeName, requestNo, wasInitiallyUpdated, indexNo) => {
        this.setState({
            arrayOfRequestedItems,
            officeName,
            requestNo,
            wasInitiallyUpdated,
            indexNo
        })
    }

    handleRequestSelected = (request) => {

        const requestNo = request.requestNo;
        const officeName = request.reqOffice;
        const wasInitiallyUpdated = request.wasInitiallyUpdated;
        const indexNo = request.index;

        let config = {
            headers: {
              'x-auth-token': this.state.xauthtoken,
            }
        }

        axios.get(`http://localhost:7777/opstocks/api/request/no/${requestNo}`, config)
           .then((response) => {
                 this.handleStoreOfRequestedItemsAndOffice(response.data['items'], officeName, requestNo, wasInitiallyUpdated, indexNo);
            })
            .catch((err) => {
                  alert('Something went wrong... ' + err);
            })
    }

    

    setWasInitiallyUpdatedToTrue = () => {
       this.state.arrayOfRequestForProcess[this.state.indexNo].wasInitiallyUpdated = true;
       this.setState({ wasInitiallyUpdated: true })
    }
    
    render() { 
       
        const { arrayOfRequestedItems, 
                officeName,
                requestNo,
                wasInitiallyUpdated,
                xauthtoken } = this.state; 

        return (
            <div>
               <UserNavBar
                  officeName="Requests of Offices"
               />

               <ProcessRequestModal
                  arrayOfRequestedItems={arrayOfRequestedItems}
                  officeName={officeName}
                  requestNo={requestNo}
                  wasInitiallyUpdated={wasInitiallyUpdated}
                  setWasInitiallyUpdatedToTrue={this.setWasInitiallyUpdatedToTrue}
                  xauthtoken={xauthtoken}
               />

               <div className="container mt-5">
                 <p>Requests For Processing</p>
                 <div className="table-wrap">
                   <table className="table table-fit table-sm table-hover table-fixed">
                     <thead>
                       <tr>
                         <th scope="col" height="50" className="align-middle">#</th>
                         <th scope="col" height="50" className="align-middle">Request No.</th>
                         <th scope="col" height="50" className="align-middle">Office</th>
                         <th scope="col" height="50" className="align-middle">Dated</th>
                       </tr>
                     </thead>
                     <tbody>
                       { this.state.arrayOfRequestForProcess.map((request, index) => 
                
                       <tr key={index}>
                          <th scope="row" className="align-middle">{(index+1)+'.'}</th>
                             <td className="align-middle">
                                <button 
                                   type="button"
                                   className="btn btn-link"
                                   onClick={this.handleRequestSelected.bind(this,
                                      {
                                         index,
                                         requestNo: request.requestNo,
                                         reqOffice: request.reqOffice,   wasInitiallyUpdated: request.wasInitiallyUpdated        
                                      }
                                    )
                                   }
                                   data-toggle="modal"
                                   data-target="#zRequestModal"
                                > 
                                   {request.requestNo}
                                </button>
                             </td>
                             <td className="align-middle">
                                 {request.reqOffice}
                             </td>
                             <td className="align-middle">
                               {
                                 new Date(request.date).toLocaleDateString("en-US")
                               }
                             </td>
                        </tr>
                        )
                       }
                       </tbody>
                    </table>
                  </div>
                </div>
            </div>
        );
    }
}

export default RequestsForProcessing;
