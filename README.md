# Braintree Dropin-ui problem reproduction

This is a repository to reproduce the problem I have described in [this topic](https://github.com/braintree/braintree-web-drop-in/issues/406).

In order to make the project works you have to:
- Fill the `brainTreeData.json` file with real information
- `npm install`
- Start the server using `npm start`
- Open browser on `localhost:3000`

To reproduce my problem:
- Start the application as explained previously
- Add card 4111111111111111 with expiry date 12/19
- Change line 11 of `index.js` with the following line ```javascript const CUSTOMER_NAME = 'one';```
- Restart the application and refresh your browser
- You should see the error 'Si è verificato un errore nei nostri sistemi.', rather then the [one here](https://github.com/braintree/braintree-web-drop-in/blob/master/src/translations/it_IT.js#L20)
