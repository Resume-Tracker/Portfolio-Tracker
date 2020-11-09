import React from 'react';
import PageloadsLineChart from './components/pageloads_line_chart';
import PageloadsTable from './components/pageloads_table';

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
    // state is a variable used by React to store the state of
    // React components
    this.state = {
      pageloads: [],
      pageloadsPerCompany: []
    }
  }

  // fetches data from the pageloads endpoint and update pageloads in
  // the React state
  fetchPageloads = () => {
    fetch('/pageloads')
    .then(response => response.json())
    .then((data) => {
      this.setState({ pageloads: data })
    })
    .catch(console.log)
  }

  // fetches data from the pageloads_per_company endpoint and update
  // pageloadsPerCompany in the React state
  fetchPageloadsPerCompany = () => {
    fetch('/pageloads_per_company')
    .then(response => response.json())
    .then((data) => {
      this.setState({ pageloadsPerCompany: data })
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
    this.fetchPageloadsPerCompany();
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
                  <Form.Control type="text"
                    placeholder="Paste your link here" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <br />
          <PageloadsLineChart pageloads={this.state.pageloads}/>
          <br />
          <PageloadsTable pageloadsPerCompany={this.state.pageloadsPerCompany}/>
        </Container>
      </>
    );
  }
}

export default App;
