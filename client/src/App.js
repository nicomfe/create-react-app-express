import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = { users: [] }
  }
  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    // Get the passwords and store them in state
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <a href="/api/twitter/login"> Twitter Login</a>
        </div>
      </div>
    );
  }
}

export default App;
