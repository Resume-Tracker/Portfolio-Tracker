import React from 'react';
import Pageloads from './components/pageloads';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    // state is a variable used by React to store the state of React components
    this.state = {
      pageloads: []
    }
  }

  // fetches data from the pageloads endpoint
  fetchPageloads = () => {
    fetch('/pageloads')
    .then(response => response.json())
    .then((data) => {
      this.setState({ pageloads: data })
    })
    .catch(console.log)
  }

  // runs after React initializes
  componentDidMount() {
  }

  // fetches pageloads data when the submit button is triggered
  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchPageloads();
  }

  render() {
    return (
      <>
        <center><h1>Portfolio Tracker</h1></center>
        <Container>
          <Row>
            <Col>
              <Form className="text-center" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formLink">
                  <Form.Label>Portfolio Link</Form.Label>
                  <Form.Control type="text" placeholder="Paste your link here" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <br />
        <Pageloads pageloads={this.state.pageloads}/>
      </>
    );
  }
}

export default App;
