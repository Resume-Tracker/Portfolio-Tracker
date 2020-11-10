import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; 
import Pageloads from "./components/pageloads";
import logo from './logo.svg';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';


function App() {
  const [startDate, setStartDate] = useState(new Date("2020/10/01"));
  const [endDate, setEndDate] = useState(new Date());
  const [visits, setVisits] = useState([]);
  
  let [, startDay, , startYear, startTime] = startDate.toUTCString().split(" ");
  let startMonth = startDate.getUTCMonth() + 1;
  let startDateString = startYear + "-" + startMonth + "-" + startDay + " " + startTime;
   
  let [, endDay, , endYear, endTime] = endDate.toUTCString().split(" ");
  let endMonth = endDate.getUTCMonth() + 1;
  let endDateString = endYear + "-" + endMonth + "-" + endDay + " " + endTime;

  let startDateEncoded = encodeURIComponent(startDateString);
  let endDateEncoded = encodeURIComponent(endDateString);

  useEffect(() => {
    fetch("/pageloads?start_date=" + startDateEncoded + "&end_date=" + endDateEncoded).then(response => 
      response.json().then(data => {
        setVisits(data);
      }))
  }, [startDateEncoded, endDateEncoded]);

  console.log("start date: " + startDate);
  console.log("end date: " + endDate);
  console.log(visits);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <Pageloads pageloads={visits} />
      </header>
      <p>
        { startDate.toUTCString() } <br/>
        { startDateString } <br/>
        { startDateEncoded }
      </p>

      <p>
        { endDate.toUTCString() } <br/>
        { endDateString } <br/>
        { endDateEncoded }
      </p>
    </div>
  );
}

export default App;
