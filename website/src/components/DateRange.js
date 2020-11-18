import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Bootstrap
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

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
