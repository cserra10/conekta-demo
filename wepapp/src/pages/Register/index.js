import React, {useState} from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography'

const Register = () => {
  const [data, setData] = useState({
    name: 'Cesar Serrano',
    email: '090300123@ucaribe.edu.mx',
    password: '123456',
    plan: 'basic',
    cardNumber: '4242424242424242',
    cardExpMonth: '06',
    cardExpYear: '2020',
    cardCVC: '123'
  })

  const [errors, setErrors] = useState([])

  const setValue = (name, value) => {
    setData(prevState => ({
      ...data,
      [name]: value
    }))
  }

  const submit = () => {
    const errors = []

    window.Conekta.setPublicKey("key_OvqQissxo1L4igivdqTJZTA")

    // Validate cvc
    if (!window.Conekta.card.validateCVC(data.cardCVC)) {
      errors.push('cvc not valid')
    }

    if (!window.Conekta.card.validateExpirationDate(data.cardExpMonth, data.cardExpYear )) {
      errors.push('expiration date not valid')
    }

    if (!window.Conekta.card.validateNumber(data.cardNumber)) {
      errors.push('card not valid')
    }

    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    window.Conekta.Token.create(
      {
        card: {
          number: data.cardNumber,
          name: data.name,
          cvc: data.cardCVC,
          exp_month: data.cardExpMonth,
          exp_year: data.cardExpYear
        }
      },
      (token) => {
        // Send post request
        const END_POINT = 'http://localhost:5001/workshop-conekta/us-central1/subscribe'
        fetch(END_POINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            tokenizedCard: token.id,
            plan: data.plan
          })
        })
          .then(response => response.json())
          .then(data =>{
            console.log(data)
          });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  return (
    <>
      <Helmet>
        <script type="text/javascript" src="https://cdn.conekta.io/js/latest/conekta.js"></script>
      </Helmet>

      <Container maxWidth="sm">
        <Typography>Fill your data</Typography>
        {errors.length > 0 && errors.map(e => (
          <Typography color="error" key={e}>{e}</Typography>
        ))}
        <form>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                label="Name"
                value={data.name}
                onChange={(e) => setValue('name', e.target.value)}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => setValue('email', e.target.value)}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                label="Password"
                value={data.password}
                onChange={(e) => setValue('password', e.target.value)}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                label="Card number"
                maxLength={16}
                value={data.cardNumber}
                onChange={(e) => setValue('cardNumber', e.target.value)}
              />
            </Grid>

            <Grid item sm={4}>
              <TextField
                label="Exp month"
                placeholder="MM"
                maxLength={2}
                value={data.cardExpMonth}
                onChange={(e) => setValue('cardExpMonth', e.target.value)}
              />
            </Grid>

            <Grid item sm={4}>
              <TextField
                label="Exp year"
                placeholder="YYYY"
                maxLength={4}
                value={data.cardExpYear}
                onChange={(e) => setValue('cardExpYear', e.target.value)}
              />
            </Grid>

            <Grid item sm={4}>
              <TextField
                label="cvc"
                placeholder="cvc"
                maxLength={4}
                value={data.cardCVC}
                onChange={(e) => setValue('cardCVC', e.target.value)}
              />
            </Grid>

            <Grid item sm={12}>
              <Button onClick={submit}>
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>

  )
}

export default Register
