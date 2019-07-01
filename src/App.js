import React, { Component} from "react";
import { hot } from "react-hot-loader";
import "./styles/scss/App.scss";

import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Opening from './components/main/Opening';
import UserDashBoard from './components/user/UserDashBoard';
import AdministratorDashBoard from './components/administrator/AdministratorDashBoard';
import RequestsForProcessing from './components/administrator/RequestsForProcessing';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
           <Router>
             <div className="App">
               <Route exact path='/' component={ Opening } />
               <Route exact path="/userdashboard" component={ UserDashBoard } />
               <Route exact path="/admindashboard" component={ AdministratorDashBoard } />
               <Route exact path="/requestsprocessing" component={RequestsForProcessing} />
             </div>
           </Router>
         </Provider>
        
      );
   }
}

export default hot(module)(App);