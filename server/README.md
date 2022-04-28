# Stripe Terminal Sample

An [Express server](http://expressjs.com) implementation of Stripe Terminal.

## Requirements

- Node v10+
- [Configured .env file](../README.md)

## How to run

1. Confirm `.env` configuration

Ensure the API keys are configured in `.env` in this directory. It should include the following keys:

```yaml
# Stripe API keys - see https://stripe.com/docs/development/quickstart#api-keys
STRIPE_SECRET_KEY=sk_test...

2. Install dependencies and start the server
```

npm install
npm start

```

3. Run the Vue web app in the client and visit `localhost:3000`.
```
