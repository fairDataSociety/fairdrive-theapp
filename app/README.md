# Fairdrive

## What is Fairdrive

Fairdrive is a dApp that enables decentralized storage on Swarm. It consists of a typical "Drive" interface with files and folders, and a BZZ wallet to manage token balances and keypairs. Under the hood, FairOS is running a filesystem on top of Ethereum Swarm. And it uses Fairdrive Protocol to communicate with FairOS.

## What is Fairdrive Protocol

Fairdrive Protocol is dapp built on top of Fairos to serve other dapps as a integration plug and play app that can be injected into components. Visit the Fairdrive Protocol documentation and github repository here.

Fairdrive consists of these parts:

- Fairdrive > a dapp
- FairOS > a filesystem running on Swarm

## How does it work

Fairdrive works very similar to Google Drive or Dropbox, yet with some big differences:

- Data is encrypted out of the box
- Data is owned by the user only
- Data is stored on a decentralized Incentivised network
- Only the user has access to this data and thus controls how data is used
- The user gets the revenue of their data

## Development

Demo: https://app.fairdrive.io

To run locally:

- clone repo
- yarn
- edit env variable -> add fairos host (eg api.fairos.io)
- yarn start

(nvm use 10)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
