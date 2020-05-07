const admin = require('firebase-admin')
const functions = require('firebase-functions')
const conekta = require('conekta')
const cors = require('cors')({ origin: true, })

admin.initializeApp()

conekta.api_key = 'key_XJ37nYXeLvBVrNHrycfLZA'
conekta.api_version = '2.0.0'

/*
  Create a customer
  This endpoint take customer and a subscription
*/
exports.subscribe = functions.https.onRequest(async (request, response) => {
  return cors(request, response, () => {
    if (request.method == 'POST') {
      try {
        const data = request.body
        if (!data.name) {
          throw new Error('Name is required')
        }

        if (!data.email) {
          throw new Error('Email is required')
        }

        if (!data.password || data.password.length < 6) {
          throw new Error('Password not valid')
        }

        if (!data.tokenizedCard) {
          throw new Error('PaymentSource is required')
        }

        if (!data.plan) {
          throw new Error('Plan is required')
        }

        if (data.plan !== 'basic' && data.plan !== 'plus') {
          throw new Error('Plan not valid')
        }

        conekta.Customer.create({
          name: data.name,
          email: data.email,
          phone: data.phone,
          payment_sources: [{ token_id: data.tokenizedCard, type: 'card' }]
        }, (err, customerResponse) => {
          if (err) {
            throw new Error(err.message)
          }

          // Once the customer is created we proceed to create the subscription
          customerResponse.createSubscription(
            { plan: data.plan },
            async (err, subscription) => {
              if (err) {
                throw new Error(err.message)
              }

              const customer = customerResponse.toObject()

              // Crete user in firebase auth
              const newUser = {
                email: data.email,
                emailVerified: false,
                password: data.password,
                displayName: data.name,
                disabled: false
              }

              const user = await admin.auth().createUser(newUser)
              const userId = user.uid

              const customClaims = { customerId: customer.id }

              await admin.auth().setCustomUserClaims(userId, customClaims)

              const responseBody = {
                customer,
                subscription
              }

              response.status(200).send(responseBody)
            }
          )
        })
      } catch (e) {
        response.status(500).send(e.message)
      }
    } else {
      response.status(200).send('endpoint to create customers')
    }
  })

})

exports.customerDetails = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const { customerId } = request.query;
    try {
      conekta.Customer.find(
        customerId,
        (err, customerResponse) => {
          const customer = customerResponse.toObject()
          if (!err) {
            response.status(500).send(customer)
          }
          else {
            response.status(200).send(err.message)
          }
        }
      )
    } catch (e) {
      response.status(500).send(e.message)
    }
  })
});

exports.clean = functions.https.onRequest(async (request, response) => {
  const objectWindow = conekta.Customer.where({}, (err, res) => {
    console.log(err, res.toObject())
  })
})
