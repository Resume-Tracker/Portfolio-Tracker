import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'

// Components
import Pageloads from './components/pageloads_graph'
import PageloadsTable from './components/pageloads_table'
import DateRange from './components/date_range'

function App () {
  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date(endDate.getTime() - (10 * 24 * 60 * 60 * 1000)))
  endDate.setHours(23, 59, 59, 999)
  startDate.setHours(0, 0, 0, 0)

  const [, startDay, , startYear, startTime] = startDate.toUTCString().split(' ')
  const startMonth = startDate.getUTCMonth() + 1
  const startDateString = startYear + '-' + startMonth + '-' + startDay + ' ' + startTime

  const [, endDay, , endYear, endTime] = endDate.toUTCString().split(' ')
  const endMonth = endDate.getUTCMonth() + 1
  const endDateString = endYear + '-' + endMonth + '-' + endDay + ' ' + endTime

  const startDateEncoded = encodeURIComponent(startDateString)
  const endDateEncoded = encodeURIComponent(endDateString)

  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Portfolio Tracker</h1>
      </div>
      <div className='App-body'>
        <DateRange
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <Pageloads
          encodedStartDate={startDateEncoded}
          encodedEndDate={endDateEncoded}
        />
        <PageloadsTable
          encodedStartDate={startDateEncoded}
          encodedEndDate={endDateEncoded}
        />
      </div>

    </div>
  )
}

export default App
