import React from 'react'

export default class CreateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "", message: ""};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }
  
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    let user = this.state.user.trim();
    let message = this.state.message.trim();
    this.props.addChat(user, message);
    // CLEAR FORM AFTER CHAT POSTED
    this.setState({
      user: "", 
      message: ""
    })
  }

  onEnterPress(e) {
    if (e.keyCode === 13 && !e.shiftKey){
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