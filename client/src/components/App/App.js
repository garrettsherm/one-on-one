import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {

  state = {
    test: []
  }

  componentWillMount(){
    this.props.socket.emit('start test');
  }

  async componentDidMount(){
    try {
      const res = await fetch('/api');
      const apiData = await res.json();
      this.setState({test: apiData})
    } catch(e) {
      console.log(`Error fetching from /api: ${e}`);
    }

    this.props.socket.on('test', sockData => this.setState({test: sockData}));

  }

  handleClick = e => {
    this.props.socket.emit('click test', 'test from client');
  }

  render() {
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
              <Link to="/fafa">Test</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
