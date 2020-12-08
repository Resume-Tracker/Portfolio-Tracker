import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './login.css'
import { useAppContext } from '../libs/context_lib'

const fetch = require('node-fetch')

export default function Login () {
  const { userHasAuthenticated } = useAppContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function validateForm () {
    return username.length > 0 && password.length > 0
  }

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
