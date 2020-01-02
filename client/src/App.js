// import React, { Component } from 'react';
// import axios from "axios";
// import io from "socket.io-client";
// import './App.css';

// // SOCKET IO
// const socket = io("http://localhost:3000")
// const API_URL = "http://localhost:3000/api/chat"

// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {data: [], typer: ''};
//     this.endRef = null;
//   }

//   componentDidMount(){
//     // this.loadChat().then(() => {
//     //   // this.scrollToBottom();
//     // })

//     socket.on('load chat', (newData) => {
//       console.log("DATA BARU");
//       this.loadChat()
//       this.setState((state) => ({ data: [...state.data, newData]}));
//     })

//     socket.on('typing', (typer) => {
//       this.setState({
//           typer
//       })
//     })

//     socket.on('stop typing', () => {
//       this.setState({
//           typer: ''
//       })
//     })

//     socket.on('delete chat', (id) => {
//       this.setState(state => ({
//           data: state.data.filter(chatData => chatData.id !== id)
//       }));
//     })
//   }

//   // componentDidUpdate() {
//   //   this.scrollToBottom();
//   // }

//   // LOAD CHAT
//   loadChat = () => {
//     return axios.get(API_URL)
//     .then((response) => {
//       if (response.data.error){
//         console.log(response.data.message);
//       } 
//       else{
//         let chatData = response.data.listed.map((chat) => {
//           return { ...chat, status: true };
//       })
//         this.setState({ data: chatData});
//       } 
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   }

//   render() {
//     return (
//       <div className="card mt-3 " >
//         <h4 className="card-header text-center text-white bg-primary">React Chat</h4>
   
//         <div className="card-body divscroll">
//           {this.state.data.map(chatData => (
//             <ChatBubble key={chatData.id} chatData={chatData} />
//           ))}
//         </div>

//         <div className="card-footer">
//           <CreateChat />
//         </div>

//       </div>
//     );
//   }
// }

// // CHAT BUBBLE (CHAT ITEM)
// function ChatBubble(props) {
//   let { user, message, id} = props.chatData;
//     return (
//       <div className="card mb-2">
//         <div className="card-header d-flex">
//           <h5 className="p-2">
//           {user}
//           </h5>
//           <button className="btn btn-outline-danger ml-auto p-2"><i className="fa fa-trash"></i></button>
//         </div>
//         <div className="card-body">
//           <div className="overflow-auto">
//           <p>{message}</p>
//           </div>
//         </div>
//       </div>
//     )
// }

// class CreateChat extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { user: "", message: ""};

//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   setTyper = typer => {
//     socket.emit("key up", typer);
//   };

//   addChat = (user = "", message = "", deletedId) => {
//     if (user.length > 0 && message.length > 0){
//       let id = Date.now();
//       axios
//         .post(API_URL, {user, message, id})
//         .then((response)=> {
//           let chatData = {...response.data, status: true}
//           socket.emit('add chat', chatData)
//           socket.emit('stop typing')
//           this.props.loadChat();
//         })
//         .catch(err => {
//           // socket.emit("Add Chat Failed", id)
//         })
//     }
//   }
  
//   handleInputChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }
  
//   handleSubmit(e){
//     e.preventDefault();
//     let user = this.state.user.trim();
//     let message = this.state.message.trim();
//     this.addChat(user, message);
//     // CLEAR FORM AFTER CHAT POSTED
//     if(
//       (user.length > 0 && message.length > 0) ||
//       (user.length === 0 && message.length === 0)
//     ) this.setState({user: "", message: ""})
//   }

//   onEnterPress = e => {
//     if (e.keyCode === 13 && !e.shiftKey){
//       e.preventDefault();
//       this.formRef.click();
//     } else {}
//   };
  
//   render() {
//     return (
//           <form onSubmit={this.handleSubmit}>
//             <input className="form-control mb-2" type="text" placeholder="Your name" name="user" value={this.state.user} onChange={this.handleInputChange} onKeyUp={this.onEnterPress} required></input>
//             <textarea className="form-control mb-2" placeholder="Write your chat here..." name="message" value={this.state.message} onChange={this.handleInputChange} onKeyUp={this.onEnterPress} required></textarea>
//             <div className="d-flex">
//             <button className="btn btn-primary p-2" type="submit" ref={el => (this.formRef = el)}><i className="fa fa-paper-plane"></i> Post</button>
//             <button className="btn btn-outline-danger ml-auto p-2" type="reset"><i className="fa fa-refresh"></i></button>
//             </div>
//           </form>
//     )
//   }
// }

// export default App;
