import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

// Bootstrap
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Pageloads from "./components/pageloads";
import PageloadsTable from "./components/pageloads_table";


function App() {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(endDate.getTime() - (10*24*60*60*1000)));
  endDate.setHours(23, 59, 59, 999);
  startDate.setHours(0, 0, 0, 0);
  
  let [, startDay, , startYear, startTime] = startDate.toUTCString().split(" ");
  let startMonth = startDate.getUTCMonth() + 1;
  let startDateString = startYear + "-" + startMonth + "-" + startDay + " " + startTime;
   
  let [, endDay, , endYear, endTime] = endDate.toUTCString().split(" ");
  let endMonth = endDate.getUTCMonth() + 1;
  let endDateString = endYear + "-" + endMonth + "-" + endDay + " " + endTime;

  let startDateEncoded = encodeURIComponent(startDateString);
  let endDateEncoded = encodeURIComponent(endDateString);

  const [visits, setVisits] = useState([]);
  const [visitsPerCompany, setVisitsPerCompany] = useState([]);

  useEffect(() => {
    fetch("/pageloads?start_date=" + startDateEncoded + "&end_date=" + endDateEncoded)
    .then(response => response.json())
    .then(data => {
        setVisits(data);
    })
    fetch("/pageloads_per_company")
    .then(response => response.json())
    .then(data => {
      setVisitsPerCompany(data);
    })
  }, [startDateEncoded, endDateEncoded]);

  console.log("start date: " + startDate.toString());
  console.log("end date: " + endDate.toString());
  console.log(visits);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Portfolio Tracker</h1>
      </div>
      <div className="App-body">
        <Container>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <br />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
          <br />
          <Pageloads pageloads={visits} />
          <br />
          <PageloadsTable pageloadsPerCompany={visitsPerCompany} />
        </Container>
      </div>
      {/* <p>
        { startDate.toUTCString() } <br/>
        { startDateString } <br/>
        { startDateEncoded }
      </p>

      <p>
        { endDate.toUTCString() } <br/>
        { endDateString } <br/>
        { endDateEncoded }
      </p> */}
    </div>
  );
}

export default App;
