import React, { Component } from 'react'
import { getRISNoYearAndMonth } from '../../utility/risNo';

export default class YesNoConfirmModal extends Component {
  render() {
    return (
      <div className="modal fade"
           tabIndex="-1"
           role="dialog"
           id="yesNoConfirmModal"
           
        >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Store Request</h5>
            </div>
            <div className="modal-body">
              <p>After SAVING Request with RIS No. {getRISNoYearAndMonth() + (this.props.risNo+1) + ' '}
                  Would you like to SUBMIT it to AMO?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.props.handleSaveNewRequest.bind(this, true)}
              >
                 Yes
              </button>
              <button type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.props.handleSaveNewRequest.bind(this, false)}
              >
                No
              </button>
              <button type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#xRequestModal"
              >
                Cancel Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
