TOC:

- [What is Fairdrive](#What-is-Fairdrive)
- [Why Fairdrive](#Why-Fairdrive)
- [Contribute/Run development](#Development)
- [How does it work](#How-does-it-work)
- [Fairdrive Share](#Fairdrive-Share)
- [Fairdrive Connect](#Fairdrive-Connect)

# Fairdrive

## What is Fairdrive

Fairdrive is a dApp that enables decentralized storage on Swarm. It consists of a typical "Drive" interface with files and folders, and a BZZ wallet to manage token balances and keypairs. Under the hood, FairOS is running a filesystem on top of Ethereum Swarm.

Fairdrive consists of these parts:

- Fairdrive > a dapp
- Fairdrive.js > a lightweight javascript library enabling (d)apps to use Fairdrive Connect
- FairOS > a filesystem running on Swarm

## Why Fairdrive

In our current economy, big data firms (Google, Facebook etc) are making tons of money (approx 3 trillion USD/year) by infringing on the privacy of its users. Users willingly hand over their own, generated data in order to receive services and emotional wellbeing.
This creates threats for our cultural development and political systems. Freedom of speech and even more imporant Freedom of Choice is being overpowered by all-knowing, all-powerful corporate networks.
Ethereum Swarm enables users to experience the same services and emotional feedback without handing over the control over their being. Encryption and decentralized infrastructure give way to a future where people are truly free in choice and expression.
In order to easily manage one's digital avatars and their earnings, Fairdrive is being created.

## How does it work

Fairdrive works very similar to Google Drive or Dropbox, yet with some big differences:

- Data is encypted out of the box
- Data is owned by the user only
- Data is stored on a decentralized incentivized network
- Only the user has access to this data and thus controls how data is used
- The user gets the revenue of their data

Let's go through a typical user journey:

![The first screen invites the user to create or restore an account](https://i.imgur.com/VsxTAVW.png)

If no account is found on the device, Fairdrive invites the user to create or restore an account.

Accounts are created from a 12 word mnemonic seed phrase.

![Accounts are created from a 12 word mnemonic seed phrase.](https://i.imgur.com/DkZ7qHx.png)

Before the user can continue, the app checks if the user has indeed backed up its mnemonic phrase.

![A user is being asked to repeat the mnemonic phrase.](https://i.imgur.com/gCTb9E0.png)

Restoring an account can be done only by reentering the mnemonic phrase.

Now the user is ready to set a username, an avatar and a password.

![A user is setting its username](https://i.imgur.com/lHXA5IN.png)

In the last screen the user is setting their/its password:

![A user is setting its password](https://i.imgur.com/RrbzLCu.png)

Before interacting with their drive, a user needs to unlock the app.

![](https://i.imgur.com/asuGKJF.png)

The user gets access to their Fairdrive.

![](https://i.imgur.com/S6twSy2.png)

## Fairdrive Share

### Vision

Shared files and folders for users and teams

### Strategy

How do we do encrypted groupchat ergo enable groups to use shared drives without sharing one key?
Ref: Book of Swarm p. 120

## Fairdrive Connect

### Vision

Interoperability of userdata/identity

### Strategy

Fairdrive Connect is part of fairdrive.js. It enables the dapp developer to allow the user to connect with its Fairdrive account.

In Fairdrive, there's a folder "DappData". Each dapp that uses Fairdrive connect will get it's own folder. This folder is a Swarm Feed with a keypair that's generated from the mnemonic of the main user account in Fair Drive.

### How it works

![](https://i.imgur.com/7a8VH0I.jpg)

User enters the dapp, let's call it ToDos. There's no account found. 
"Connect with Fairdrive" shows. The user clicks the button. The dapp uses fds.js to create a new keypair based on a minute rounded timestamp and a private key that has a unique 6 digit code.

```
// Generate timestamp, rounded to the minute
const timeStamp = 123456
// Generate 6 digit string
const shortCode = Math.floor(100000 + Math.random() * 900000);
const seedstring = shortCode.toString().concat('-any-string-', timeStamp.toString())
// Use seedstring to generate keypair
const privateKeyGenerated = byteArrayToHex(stringToUint8Array(seedstring), false)
const keyPair = createKeyPair(privateKeyGenerated)
```

With this keypair ("txPair") a temp Swarm Feed is created and a listener is set. In the feed an object is set with the Dapp's name, icon etc.

The Dapp creates another keypair ("dappPair") and shares the PublicKey to the shared feed.

The dapp opens a new window:
`fairdrive.eth/connect?[6 digit string]`

Fairdrive derives the same keypair ("txPair") from the string as it knows the timestamp (which will only be valid for one minute) and the 6 digit string.

```
  // Generate timestamp, rounded to the minute
const timeStamp = 123456

const shortCode = params.shortcode // from the url
const seedstring = shortCode.toString().concat('-any-string-', timeStamp.toString())
const privateKeyGenerated = byteArrayToHex(stringToUint8Array(seedstring), false)
const keyPair = createKeyPair(privateKeyGenerated)
```

Fairdrive shows a screen with the dapp's icon and name asking the user permission to connect this Dapp.

Fairdrive generates a new keypair based on the root mnemonic that is used to create the Fairdrive root account ("folderPair").

With the new keypair a Swarm Feed is created.
The new Swarm Feed is added to the Fairdrive user's folder structure.

The folderPair and it's metadata is encrypted with the dappPair's publicKey and saved to the temp Swarm Feed that's created by the txPair.

The user is now redirected back to the ToDos dapp. The listener has picked up and decrypted the folderPair and is ready to create a useraccount for the dapp.

The username and avatar is filled automatically from Fairdrive, the only thing left for the user is to choose a password to encrypt the privatekey in localstorage (if the dapp developer opts to do so).

## The future of Fairdrive

Fairdrive Connect will give users the ability to use Fairdrive as their launchpad for the dapp ecosystem. Through Fairdrive Share, users will create contacts (friends) with which to share files and dapps.
Fairdrive Connect as SSO will enable users to bid Google farewell and move over to the Fair Data Economy.

If a system has Identity, Cloud Storage, a Dappstore and Contacts, it comes really close to what we call "Android" or "iOS" today. Add a wallet and we have Google/Apple Pay in place.

The future vision of Fairdrive is to have a fully fledged mobile OS running on Swarm.

We believe we can achieve this by moving towards this goal with small incremental steps.

## Development

Demo: https://app.fairdrive.io

To run locally:

- clone repo
- yarn
- yarn start

(nvm use 10)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
