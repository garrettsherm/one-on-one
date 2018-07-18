import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    test: []
  }

  componentDidMount(){
    fetch('/api')
      .then(res => res.json())
      .then(test => this.setState({ test }))
      .catch(() => console.log('error fetching /api on mount'));
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
