# Accept an in-person payment

## How to run locally

This is the Vue client for the sample and runs independently of the server. Running a backend server is a requirement
and a dependency for this React front-end to work. See the README in the root
of the project for more details.

To run the Vue client locally:

1. Install dependencies

From this directory run:

```sh
yarn install
```

2. Start the Vue app

```sh
yarn dev
```

This will start the react server running on localhost:3000. Note that the
backend servers run on localhost:4242, but the React UI will be available at
localhost:3000. API requests to your backend are proxied by the
Vite server using the settings in `./vite.config.json`.
