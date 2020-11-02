import React from 'react';
import Pageloads from './components/pageloads';

class App extends React.Component {
  // state is a variable used by React to store data
  state = {
      pageloads: []
  }
  // function to retrieve pageloads data from the server
  componentDidMount() {
    fetch('/pageloads')
    .then(response => response.json())
    .then((data) => {
      this.setState({ pageloads: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <Pageloads pageloads={this.state.pageloads}/>
    );
  }
}

export default App;
