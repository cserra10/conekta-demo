import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import firebase from 'firebase'
import {Box} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Game from './Game'

const MyAccount = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser
    if (currentUser) {
      currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          const customerId = idTokenResult.claims.customerId

          const END_POINT = 'http://localhost:5001/workshop-conekta/us-central1/customerDetails'
          fetch(`${END_POINT}?customerId=${customerId}`)
            .then(response => response.json())
            .then(data =>{
              setCustomer(data)
            });
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, [])


  return (
    <Container maxWidth="sm">
      <Typography>Dashboard</Typography>

      { customer && (
        <>
          <Box m={2}>
            <Typography variant="subtitle1">{customer.name}</Typography>
          </Box>
          <Box m={2}>
            <Typography variant="caption">{customer.email}</Typography>
          </Box>
          <Box m={2}>
            <Typography variant="caption">Subscription details </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Subscription Id"
                  secondary={customer.subscription.id}
                />
                <ListItemText
                  primary="Subscription status"
                  secondary={customer.subscription.status}
                />
                <ListItemText
                  plan="Subscription plan"
                  primary="Plan"
                  secondary={customer.subscription.plan_id}
                />
              </ListItem>
            </List>
          </Box>

          <Box m={2}>
            <Typography variant="caption">Payment Details</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Last 4"
                  secondary={customer.payment_sources.data[0].last4}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="bin"
                  secondary={customer.payment_sources.data[0].bin}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Brand"
                  secondary={customer.payment_sources.data[0].brand}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Exp Date"
                  secondary={`${customer.payment_sources.data[0].exp_month} / ${customer.payment_sources.data[0].exp_year}`}
                />
              </ListItem>
            </List>
          </Box>

          <Game version={customer.subscription.plan_id}/>
        </>
      )}
    </Container>
  )
};

export default MyAccount;
