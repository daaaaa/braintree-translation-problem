const path = require('path')
const braintree = require('braintree')
const brainTreeData = require('./brainTreeData')

module.exports = async function (fastify, options) {
  const gateway = braintree.connect({
    ...brainTreeData,
    environment: braintree.Environment.Sandbox,
  });

  const CUSTOMER_NAME = 'one';

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'frontend'),
    prefix: '/',
  })

  fastify.get('/client_token', async () => {
    const customer = await gateway.customer
      .find(CUSTOMER_NAME)
      .then(() => true)
      .catch(({ type }) => {
        if ('authenticationError' === type) {
          throw new Error('You have probably forgotten to fill brainTreeData.json file')
        }
        return false
      });

    if (customer === false) {
      await gateway.customer.create({
        id: CUSTOMER_NAME,
      });
    }

    return gateway.clientToken.generate({
      customerId: CUSTOMER_NAME,
      options: {
        failOnDuplicatePaymentMethod: true,
      }
    })
  })

  fastify.post('/checkout', async ({ body }, res) => {
    const { nonce } = body

    await gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      }
    });

    return 'payed'
  })

}

