## Development

### Prerequisites

In order to run the Fairdrive successfully, two services are required:

- An instance of a Bee node
- A blockchain RPC server

Although the application can be configured to use remote services locally, for development purposes it is much more efficient to use [fdp-play](https://github.com/fairDataSociety/fdp-play).

#### FDP-Play

Fdp-play is a command line tool that uses Docker to provide all required services for Fairdrive to run. It provides a local Bee node and an RPC with all required smart contracts. All created data in fdp-play is local, so it is ideal for development and testing.

To install fdp-play you need to have Docker installed, then run the following command:

```bash
npm install -g @fairdatasociety/fdp-play
```

And then to start it:

```bash
fdp-play start
```

For getting all options of fdp-play, run:

```bash
fdp-play --help
```

_Note_: For any issues running or interacting with fdp-play check its [repo](https://github.com/fairDataSociety/fdp-play) for more details.

#### Creating a postage batch

The application requires a postage stamp to be available in Bee node. First create one with th following command:

```bash
curl -s -XPOST http://localhost:1635/stamps/10000000/18
```

Response will look similar like this:

```JSON
{"batchID":"9b35473393ed97fd4c7c62fc4b904f1dc063ecd4de854e2d36837e67a7d9f92b","txHash":"0x31559a4dcaf1471387a24f48ae6745e37a892e9c258e4db8b93c4cba4c446265"}
```

Then save the value of the `batchID` property for later to configure the app.

### Configuration

Before running the application, it should be properly configured. To do so, create the `.env` file in the root directory of the project.

Minimal configuration required for running the application locally are the following keys:

```
NEXT_PUBLIC_BEE_URL=http://localhost:1633
NEXT_PUBLIC_GLOBAL_BATCH_ID=<batchID>
```

The `NEXT_PUBLIC_BEE_URL` defines URL of the Bee node which is used for accessing data.

For the value of the `NEXT_PUBLIC_GLOBAL_BATCH_ID` field, set the value of the `batchID` property obtained in [this section](#creating-a-postage-batch).

#### Complete field list

There are some fields that are used only when the application is hosted on a remote server. Here is the list of all possible options:

- `NEXT_PUBLIC_ENVIRONMENT` - If set to `PRODUCTION`, this option will hide all development features.
- `NEXT_PUBLIC_BEE_URL` - URL of a Bee node that will be used for data access.
- `NEXT_PUBLIC_GLOBAL_BATCH_ID` - Batch ID used for writing data to the Bee node
- `NEXT_PUBLIC_FAIROSHOST` - The URL on which the application is hosted
- `NEXT_PUBLIC_BLOSSOM_ID` - ID of the Blossom extension
- `NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT` - URL of the Create Account App, that will be linked inside the application.
- `NEXT_PUBLIC_BB_RULES_URL` - Redirect URL that is used after creating an invite. Typically it should be `"https://${NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT}/#/bb-rules"`
- `NEXT_PUBLIC_BB_API_URL` - URL of analytics server. Users can choose whether to allow analytics on the login.

### Running the app

Before running the application for the first time, install all dependencies:

```bash
npm install
```

Then to start the development server that will listen on port 3000, run the next command:

```bash
npm run dev
```

Open the http://localhost:3000 URL in browser and you should see the login page.

#### Creating an account

By default accounts can be created using the Metamask extension only. But additional login with username and password can be enabled by opening the app with a query parameter `http://localhost:3000/?fdsLogin=true`

To create a FDS account locally check the [fdp-create-account](https://github.com/fairDataSociety/fdp-create-account).

_Note_: If not able to login by getting some RPC errors. A very likely the issue is different smart contract addresses in the application config and in fdp-play. To solve this start `fdp-play` with latest `fdp-contracts` image by running `fdp-play start --fresh --pull`

### Deployment

Before deploying the application to a remote server, set all the fields in the `.env` file. Then build the app for production:

```bash
npm run build
```

This command will generate all production files inside the `out` directory. Deploy the content of the `out` directory to your remote server.
