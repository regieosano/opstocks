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
            xauthtoken: ''
        }
    }  

    handleStoreArrayOfRequestAndToken = (arrayOfRequestForProcess, xauthtoken) => {
        this.setState({
            arrayOfRequestForProcess,
            xauthtoken
        })
      
    }

    handleStoreOfRequestedItemsAndOffice = (arrayOfRequestedItems, officeName, requestNo) => {
        this.setState({
            arrayOfRequestedItems,
            officeName,
            requestNo
        })
    }

    handleRequestSelected = (request) => {

        const requestNo = request.requestNo;
        const officeName = request.reqOffice; 

        let config = {
            headers: {
              'x-auth-token': this.state.xauthtoken,
            }
        }

        axios.get(`http://localhost:7777/opstocks/api/request/no/${requestNo}`, config)
           .then((response) => {
                 this.handleStoreOfRequestedItemsAndOffice(response.data['items'], officeName, requestNo);
            })
            .catch((err) => {
                  alert('Something went wrong... ' + err);
            })

    }


    componentDidMount() {
        const spear = this.props.location['state'];
        this.handleStoreArrayOfRequestAndToken(spear['arrow'], spear['shield']);
    }


    render() { 
       
        return (
            <div>
               <UserNavBar
                  officeName="Requests of Offices"
               />

               <ProcessRequestModal
                  arrayOfRequestedItems={this.state.arrayOfRequestedItems}
                  officeName={this.state.officeName}
                  requestNo={this.state.requestNo}
                  xauthtoken={this.state.xauthtoken}
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
                                         requestNo: request.requestNo,
                                         reqOffice: request.reqOffice            
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
