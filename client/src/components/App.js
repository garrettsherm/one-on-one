import React, { Component } from 'react';
import './App.css';
import io from "socket.io-client";

class App extends Component {



  state = {
    test: []
  }

  socket = io.connect();   


  async componentDidMount(){
    try {
      const res = await fetch('/api');
      const apiData = await res.json();
      this.setState({test: apiData})
    } catch(e) {
      console.log(`Error fetching from /api: ${e}`);
    }
  }

  handleClick = e => {
    this.socket.emit('click test', 'test from client');
  }

  render() {

    this.socket.on('test', sockData => this.setState({test: sockData}));

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <header>
                <h1>Welcome to React</h1>
              </header>
              <p>
                {
                  this.state.test.map(test =>
                    <span key={test.test}>{test.test}</span>
                  )
                }
              </p>
              <button onClick={this.handleClick}>Test Click</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
