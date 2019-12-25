import React, { Component } from 'react';
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:3000")
const API_URL = "http://localhost:3000/api/chat"

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="card mt-3 " >
        <h4 className="card-header text-center text-white bg-primary">React Chat</h4>
   
        <div className="card-body">
          <ChatBubble />
        </div>

        <div className="card-footer">
          <CreateChat />
        </div>

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
  constructor(props) {
    super(props);
    this.state = { user: "", message: ""};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setTyper = typer => {
    socket.emit("key up", typer);
  };

  addChat = (user = "", message = "") => {
    if (user.length > 0 && message.length > 0){
      let id = Date.now();
      axios
        .post(API_URL, {user, message, id})
        .then(()=> {})
        .catch(err => {
          socket.emit("Add Chat Failed", id)
        })
    }
  }
  
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleSubmit(e){
    e.preventDefault();
    let user = this.state.user.trim();
    let message = this.state.message.trim();
    this.addChat(user, message);
    // CLEAR FORM AFTER CHAT POSTED
    if(
      (user.length > 0 && message.length > 0) ||
      (user.length === 0 && message.length == 0)
    ) this.setState({user: "", message: ""})
  }

  onEnterPress = e => {
    if (e.keyCode == 13 && !e.shiftKey){
      e.preventDefault();
      this.formRef.click();
    } else {}
  };
  
  render() {
    return (
          <form onSubmit={this.handleSubmit}>
            <input className="form-control mb-2" type="text" placeholder="Your name" name="user" value={this.state.user} onChange={this.handleInputChange} onKeyUp={this.onEnterPress} required></input>
            <textarea className="form-control mb-2" placeholder="Write your chat here..." name="message" value={this.state.message} onChange={this.handleInputChange} onKeyUp={this.onEnterPress} required></textarea>
            <div className="d-flex">
            <button className="btn btn-primary p-2" type="submit" ref={el => (this.formRef = el)}><i className="fa fa-paper-plane"></i> Post</button>
            <button className="btn btn-outline-danger ml-auto p-2" type="reset"><i className="fa fa-refresh"></i></button>
            </div>
          </form>
    )
  }
}

export default App;
