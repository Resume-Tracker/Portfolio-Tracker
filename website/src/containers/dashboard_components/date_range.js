import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

/*
  React component that allows the user to select a date range to display data. Date can be selected by the returned UI
  or typed in with the provided format (ex: 12/8/2020)
*/
export const DateRange = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className='dateRange'>
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
      </Container>
    </div>
  )
}

export default DateRange
