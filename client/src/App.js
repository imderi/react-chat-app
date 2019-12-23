import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="card mt-3 " >
        <h4 className="card-header text-center text-white bg-primary">React Chat</h4>
        <div className="card-body">
          
          <ChatBubble />

        </div>

        <CreateChat />

      </div>
    );
  }
}

class ChatBubble extends Component {
  render() {
    return (
      <div className="card mb-2">
        <h5 className="card-header">Batman</h5>
        <div className="card-body">
          <p>Lagi apa bro?</p>
        </div>
      </div>
    )
  }
}

class CreateChat extends Component {
  render() {
    return (
        <div className="card-footer">
          <form action="http://localhost:3000/api/chat" method="post">
            <input className="form-control mb-2" type="text" placeholder="Your name" name="user" required></input>
            <textarea className="form-control mb-2" placeholder="Write your chat here..." name="message" required></textarea>
            
            <div className="d-flex">
            <button className="btn btn-primary p-2" type="submit"><i className="fa fa-paper-plane"></i> Post</button>
            <button className="btn btn-outline-danger ml-auto p-2" type="reset"><i className="fa fa-refresh"></i></button>
            </div>
          </form>
        </div>
    )
  }
}

export default App;
