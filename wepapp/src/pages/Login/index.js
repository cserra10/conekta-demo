import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [data, setData] = useState({
    email: '090300123@ucaribe.edu.mx',
    password: '123456'
  });

  const [error, setError] = useState();

  const history = useHistory()

  const setValue = (name, value) => {
    setData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const submit = () => {
    firebase.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(user => {
        history.push('/dashboard')
      })
      .catch(function(error) {
        setError(error.message)
        console.error(error.message)
      })
  }

  return (
    <Container maxWidth="sm">
      <Box p={2}>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Box p={2}>
        <TextField
          label="Email"
          value={data.email}
          onChange={(e) => setValue('email', e.target.value)}
        />
      </Box>
      <Box p={2}>
        <TextField
          label="Password"
          value={data.password}
          onChange={(e) => setValue('password', e.target.value)}
        />
      </Box>
      <Box p={2}>
        <Button onClick={submit}>Login</Button>
      </Box>
    </Container>
  )
};

export default Login;
