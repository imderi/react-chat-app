import React, { Component } from 'react';
import axios from "axios";
import io from "socket.io-client";
import '../App.css'

import ChatBubble from './chatBubble'
import CreateChat from './createChat'


// SOCKET IO
const socket = io("http://localhost:3000")
const API_URL = "http://localhost:3000/api/chat"

export default class ChatBox extends Component {
  constructor(props){
    super(props);
    this.state = {data: [], typer: ''};
    // this.endRef = null;
  }

  componentDidMount(){
    this.loadChat().then(() => {
      this.scrollToBottom();
    })

    socket.on('load chat', (newData) => {
      this.loadChat()
      this.setState((state) => ({ data: [...state.data, newData]}));
    })

    socket.on('typing', (typer) => {
      this.setState({
          typer
      })
    })

    socket.on('stop typing', () => {
      this.setState({
          typer: ''
      })
    })

    socket.on('delete chat', (id) => {
      this.setState(state => ({
          data: state.data.filter(chatData => chatData.id !== id)
      }));
    })
  }

  // LOAD CHAT
  loadChat = () => {
    return axios.get(API_URL)
    .then((response) => {
      if (response.data.error){
        console.log(response.data.message);
      } 
      else{
        let chatData = response.data.listed.map((chat) => {
          return { ...chat, status: true };
      })
        this.setState({ data: chatData});
      } 
    })
    .catch((error) => {
      console.log(error);
    })
  }

  addChat = (user = "", message = "", id) => {
    if (user.length > 0 && message.length > 0){
      let id = Date.now();
      axios
        .post(API_URL, {user, message, id})
        .then((response)=> {
          let chatData = {...response.data, status: true}
          socket.emit('add chat', chatData)
          socket.emit('stop typing')
          this.loadChat();
        })
        .catch(err => {
          // socket.emit("Chat Failed", id)
        })
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div className="card mt-3 " >
        <h4 className="card-header text-white bg-primary"><i class="fa fa-commenting-o"></i> React Chat</h4>
        <div className="card-body divscroll" ref={(el) => {this.messagesEnd = el;}}>
          {this.state.data.map(chatData => (
            <ChatBubble key={chatData.id} chatData={chatData} />
          ))}
        </div>

        <div className="card-footer">
          <CreateChat addChat={this.addChat} setTyper={this.typingChat} />
        </div>
      </div>
    );
  }
}