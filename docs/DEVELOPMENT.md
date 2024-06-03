## Development

Please install `fdp-play`, be sure to use Node 16 and have Docker environment setup and verify that ports 3000, 1633, 1634, 1635 are available.
Testnet deployment : http://app.fairdrive.dev.fairdatasociety.org/

- `npm i -g @fairdatasociety/fdp-play`
- `fdp-play start --fresh`

#### Post installation steps

How to initialize [Postage batch](POSTAGE-BATCH.md).

#### Goerli contract configuration

How to init [Goerli](INIT-GOERLI.md).

## Running in development mode

Install dependencies and run:

```bash
yarn
yarn start
```

Or using `npm`:

```bash
npm ci
npm start
```

To change the configuration, edit the `.env` file.
