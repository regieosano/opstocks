import { UserNavBar } from './../parts/UserNavBar';
import React, { Component } from 'react';

import axios from 'axios'

import { withRouter } from 'react-router-dom';


class AdministratorDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestsForProcessing: [],
            xauthtoken: ''
        }
    }
       

    handleLogoutClicked = () => {
        this.props.history.push(`/`); 
    }

    handleRequestsProcessingAction = () => {
        this.props.history.push(`/requestsprocessing`, {
            arrow: this.state.requestsForProcessing,
            shield: this.state.xauthtoken
        });
    }

    handleStoreOfRequestsForProcessing = (requestsForProcessing, xauthtoken) => {
        this.setState({
            requestsForProcessing,
            xauthtoken
        })
    }

    handleGetRequestsForProcessing = (xauthtoken) => { 

        const config = {
            headers: {
              'x-auth-token': xauthtoken,
            }
        }

         axios.get('http://localhost:7777/opstocks/api/requests/true', config)
             .then(response => this.handleStoreOfRequestsForProcessing(response.data, xauthtoken))
             .catch(err => alert('Something went wrong... ' + err))    
    }


    componentDidMount() {

        const supreme = this.props.location['state'];

        this.handleGetRequestsForProcessing(supreme.emerald['xauthtoken']);
       
    }


    render() {
        return (
            <div>
                <UserNavBar
                   officeName="Administrator"
                   handleLogoutClicked={this.handleLogoutClicked}
                />
                <div className="container mt-5">
                  <div className="list-group">
                    <button type="button"
                            className="list-group-item list-group-item-action"
                            onClick={this.handleRequestsProcessingAction}
                    >
                        Requests For Processing&nbsp;&nbsp;
                        <span 
                            className="badge badge-secondary"
                        >
                            {this.state.requestsForProcessing.length}
                        </span>
                    </button>
                    <button type="button"
                            className="list-group-item list-group-item-action">
                            Data Analytics
                    </button>
                    <button type="button"
                            className="list-group-item list-group-item-action">
                            Requests History
                    </button>
                    <button type="button"
                            className="list-group-item list-group-item-action">
                            Add New Office
                    </button>
                    <button type="button"
                            className="list-group-item list-group-item-action">
                            Add New Item
                    </button>
                  </div>
                </div>
              
            </div>
        );
    }
}

export default withRouter(AdministratorDashBoard);
