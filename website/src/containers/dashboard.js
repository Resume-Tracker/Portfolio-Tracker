import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

// Components
import Pageloads from './dashboard_components/pageloads_graph'
import PageloadsTable from './dashboard_components/pageloads_table'
import DateRange from './dashboard_components/date_range'

export default function Dashboard () {
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
