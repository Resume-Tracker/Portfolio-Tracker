import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './login.css'
import { useAppContext } from '../libs/context_lib'

const fetch = require('node-fetch')

/*
  React component that's responsible for rendering the login page. Prompts the user for a username and password and stores it as a string.
  Username and password is then packaged into a JSON object and sent to the /login endpoint of our backend.
  If backend responds with a 200 status code, the session is authenticated and is redirected to the dashboard.
  Else a prompt is displayed telling the user they entered the wrong username and password.
*/
export default function Login () {
  const { userHasAuthenticated } = useAppContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Function that checks to see a username and password is entered into the form
  // Needed to disable button when username and password fields are empty
  function validateForm () {
    return username.length > 0 && password.length > 0
  }

  // Function that handles a login request upon submiting the form.
  async function handleSubmit (event) {
    event.preventDefault()

    const userPassJSON = { user: username, pass: password }
    try {
      await fetch('/login', {
        method: 'post',
        body: JSON.stringify(userPassJSON),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          if (response.status === 200) {
            userHasAuthenticated(true)
          } else {
            window.alert('Wrong username or password')
          }
        })
    } catch (e) {
      window.alert('Error logging in.')
    }
  }

  return (
    <div className='Login'>
      <Form onSubmit={handleSubmit}>
        <Form.Group size='lg' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size='lg' type='submit' disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  )
}
