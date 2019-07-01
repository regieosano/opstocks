import React, { Component } from 'react'

class TopNavBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand text-white" href="/">OP STOCKS</a>
          <button className="navbar-toggler" type="button"   data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
               <li className="nav-item text-white administrator-click"
                   data-toggle="modal"
                   data-target="#loginModalAdministrator"
               >
                  Welcome
               </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default TopNavBar
