import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'

const fetch = require('node-fetch')

export const PageloadsTable = ({ encodedStartDate, encodedEndDate }) => {
  const [visitsPerCompany, setVisitsPerCompany] = useState([])

  useEffect(() => {
    async function fetchPageloadsTable () {
      try {
        await fetch('/pageloads_per_company?start_date=' + encodedStartDate + '&end_date=' + encodedEndDate)
          .then(response => response.json())
          .then(data => {
            // fetch successful
            setVisitsPerCompany(data)
          }, () => {
            // fetch failed; do nothing
          })
      } catch (e) {
        console.error(e)
      }
    }
    fetchPageloadsTable()
  }, [encodedStartDate, encodedEndDate])

  // Create a React HTML-like element for the table head
  const tableHead = (
    <tr>
      <th>Company Name</th>
      <th>View Count</th>
      <th>Scrolled to End</th>
    </tr>
  )

  const tableEntries = []

  // Store company name and view count pairs as React HTML-like
  // elements into the array
  for (const [key, values] of Object.entries(visitsPerCompany)) {
    tableEntries.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{values[0]}</td>
        <td>{(values[1] * 100).toFixed(2)}%</td>
      </tr>
    )
  }

  // only renders the table if there are data
  if (tableEntries.length) {
    return (
      <div className='pageloadsTable'>
        <Table striped bordered hover>
          <thead>
            {tableHead}
          </thead>
          <tbody>
            {tableEntries}
          </tbody>
        </Table>
      </div>
    )
  } else {
    return (
      <div className='pageloadsTable'>No data available</div>
    )
  }
}

export default PageloadsTable
