import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const DateRange = ({newData}) => {
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

  return (
    <div id="dateRange">
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
    </div>
  );
}

export default DateRange;
