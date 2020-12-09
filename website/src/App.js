import React, { useState, useEffect } from 'react'
import Routes from './routes'
import { AppContext } from './libs/context_lib'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './App.css'

const fetch = require('node-fetch')

/*
  Main app component. Responsible for routing the necessary pages of our webapp and creates a navbar
  to go to the homepage and login page. Also checks to see if current session is authenticated with onLoad()
*/
export default function App () {
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  // empty array: only run on the first render
  useEffect(() => {
    onLoad()
  }, [])

  // check for valid session before website render
  async function onLoad () {
    await fetch('/check_session')
      .then(response => {
        if (response.status === 200) {
          userHasAuthenticated(true)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })

    setIsAuthenticating(false)
  }

  return (
    !isAuthenticating && (
      <>
        <div className='App-default'>
          <Navbar variant='dark' className='App-header'>
            <Navbar.Brand className='navbar-brand'>
              Portfolio Tracker
            </Navbar.Brand>
            <Nav>
              <Nav.Link href='/'>Home</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              {isAuthenticated
                ? (
                  <Nav>
                    <Nav.Link href='/logout'>Logout</Nav.Link>
                  </Nav>
                  )
                : (
                  <Nav>
                    <Nav.Link href='/login'>Login</Nav.Link>
                  </Nav>
                  )}
            </Navbar.Collapse>
          </Navbar>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Routes />
          </AppContext.Provider>
        </div>
      </>
    )
  )
}
