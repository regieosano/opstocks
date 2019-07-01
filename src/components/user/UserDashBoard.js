import React, { Component } from 'react';
import axios from 'axios';
import { UserNavBar } from '../parts/UserNavBar';

import { connect } from 'react-redux';

import '../../styles/scss/UserDashBoard.scss';

import PropTypes from 'prop-types';

import ViewRequestModal from '../modal/ViewRequestModal';
import NewRequestModal from '../modal/NewRequestModal';
import { getRequests, getRISLastNo } from './../../actions/requestsAction';

class UserDashBoard extends Component {

    constructor(props) {
      super(props);
      this.state = {
          officeName: 'The Office Now',
          lastRISNo: '',
          requestNo: '',
          isRequestSubmittedAlready: false,
          xauthtoken: '',
          officeRequests: [],
          requestedItems: []
      }
    }
   

    handleStoreOfRequestedItems = (requestedItems) => {
      this.setState({
         requestedItems,
      })
    }

    handleRISNoSelected = (request) => {
        const requestNo = request.requestNo;
        const isRequestSubmittedAlready = request.isRequestSubmittedAlready;

        let config = {
          headers: {
            'x-auth-token': this.state.xauthtoken,
          }
        }
      
        axios.get(`http://localhost:7777/opstocks/api/request/no/${requestNo}`,  config)
           .then((response) => {
                 this.handleStoreOfRequestedItems(response.data['items']);
            })
            .catch((err) => {
                  alert('Something went wrong... ' + err);
            })

        this.setState({
          requestNo,
          isRequestSubmittedAlready 
        })
    }

    handleOfficeIdNameLastRISNoAndAuthToken = (officeName, lastRISNo, xauthtoken) => {
        this.setState({
          officeName,
          lastRISNo,
          xauthtoken 
        })
      
    }

    componentDidMount() {
    
      const mighty = this.props.location['state'];

      this.props.getRequests(mighty.majestic['officeName'], mighty.majestic['xauthtoken']);

      this.handleOfficeIdNameLastRISNoAndAuthToken(
            mighty.majestic['officeName'],
            mighty['baseRISNo'],
            mighty.majestic['xauthtoken']
      );    
     
    }

    render() { 

        const { requests, loading } = this.props.request;
       
        const { officeName,
                requestNo,
                isRequestSubmittedAlready,
                requestedItems,
                xauthtoken,
                lastRISNo } = this.state;

        const bodyContent = 
               requests.map((request, index) =>           
               <tr key={index}>
                 <th scope="row" className="align-middle">{(index+1)+'.'}</th>
                    <td className="align-middle">
                       <button type="button"
                               className="btn btn-link"
                               onClick={this.handleRISNoSelected.bind(this, {
                                  requestNo: request.requestNo,
                                  isRequestSubmittedAlready: request.isRequestSubmittedAlready
                               })}
                               data-toggle="modal" 
                               data-target="#yRequestModal"
                       >
                           {request.requestNo}
                       </button>
                    </td>
                    <td className="align-middle">
                      { 
                        new Date(request.date).toLocaleDateString("en-US")
                      }
                    </td>
                    <td className="align-middle">
                      {
                          request.isRequestSubmittedAlready ? (
                             <span className="homeColor">
                                <i className="fas fa-home"></i>&nbsp;AMO
                             </span>
                          ):(
                             <span className="userColor">
                                <i className="fas fa-user-edit"></i>&nbsp;TBS
                             </span>
                          ) 
                      }                    
                    </td>
                 </tr>
                ) 

        const contentNoRecords = <tr><td>No RECORD(S) Found.</td></tr>  
        const loadingSpinner = <tr className="spinner-border text-info mt-1"></tr> 
           
        return (
            <div>
              <UserNavBar
                 officeName={officeName}
              />

              <ViewRequestModal 
                  requestNo={requestNo}
                  xauthtoken={xauthtoken}
                  requestedItems={requestedItems}
                  isRequestSubmittedAlready={isRequestSubmittedAlready} 
              />
                
              <NewRequestModal 
                 officeName={officeName}
                 xauthtoken={xauthtoken}
                 baseRISNo={lastRISNo}
              />

              <div className="container mt-5">
                <p>Request History</p>
                <div className="table-wrap">
                  <table className="table table-fit table-sm table-hover table-fixed">
                    <thead>
                     <tr>
                       <th scope="col" height="50" className="align-middle">#</th>
                       <th scope="col" height="50" className="align-middle">Request No.</th>
                       <th scope="col" height="50" className="align-middle">Dated</th>
                       <th scope="col" height="50" className="align-middle">Status</th>
                    </tr>
                   </thead>
                   <tbody>
                      {
                         loading ? loadingSpinner : requests.length > 0  ?
                         (
                            bodyContent
                         ):(
                            contentNoRecords
                         )
                      }        
                   </tbody>
                  </table>
                </div>
               
                <div className="createNewRequest mt-3">
                   <button type="button" 
                         className="btn btn-primary"
                         data-toggle="modal" 
                         data-target="#xRequestModal"
                   >
                       Create NEW Request
                   </button>
                </div>
     
              </div>
            </div>
            
        );
    }
}

UserDashBoard.propTypes = {
  getRequests: PropTypes.func.isRequired,
  getRISLastNo: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  request: state.request
})

export default connect(mapStateToProps, { getRequests, getRISLastNo})(UserDashBoard);
