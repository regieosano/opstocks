import React, { Component } from 'react'

class WelcomeJumbotron extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <div className="jumbotron">
         <h1 className="display-4">Hello, world!</h1>
         <p className="lead">Welcome to the OP-Stocks System!!!</p>
         <hr className="my-4" />
       </div>
      </div>
    )
  }
}

export default WelcomeJumbotron
