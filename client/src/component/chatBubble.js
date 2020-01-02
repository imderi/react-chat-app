import React from 'react';

function ChatBubble(props) {
  let { user, message, id} = props.chatData;
    return (
      <div className="card mb-2">
        <div className="card-title d-flex">
          <h5 className="p-3"><i class="fa fa-user-circle-o"></i> {user}</h5>
          <h5 className="ml-auto p-3"><span className="badge badge-pill badge-danger"><i className="fa fa-trash"></i></span></h5>
          {/* <button className="btn btn-outline-danger ml-auto p-2"><i className="fa fa-trash"></i></button> */}
        </div>
        <div className="card-body">
          <div className="overflow-auto">
          <p className="card-text">{message}</p>
          </div>
        </div>
      </div>
    )
}

export default ChatBubble;