import React from 'react'
import Table from 'react-bootstrap/Table';

const PageloadsTable = ({ pageloadsPerCompany }) => {
  // Create a React HTML-like element for the table head
  const tableHead = <tr>
                      <th>Company Name</th>
                      <th>View Count</th>
                    </tr>

  const tableEntries = []
  // Store company name and view count pairs as React HTML-like
  // elements into the array
  for (const [key, value] of Object.entries(pageloadsPerCompany)) {
    tableEntries.push(
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                      )
  }

  // only renders the table if there are data
  if (tableEntries.length) {
    return (
      <div id="pageloadsTable">
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
      <div id="pageloadsTable">
      </div>
    )
  }
}

export default PageloadsTable
