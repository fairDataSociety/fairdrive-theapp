# Fairdrive

Where innovation, interoperability and decentralization unite in the name of fair data.
Fairdrive is a community-driven initiative with the mission to empower freedom. By enabling decentralized storage, developers can create and build interoperable, decentralized and open-sourced dApps so users can reclaim their privacy, own their data and control their digital identity.

## What is Fairdrive

Fairdrive is a dApp that enables decentralized storage on Swarm. It consists of a typical "Drive" interface with files and folders, and a BZZ wallet to manage token balances and keypairs. Under the hood, FairOS is running a filesystem on top of Ethereum Swarm. Fairdrive Protocol is used to communicate with FairOS.

## How does it work

Fairdrive works very similar to Google Drive or Dropbox, yet with some big differences:

- Data is encrypted out of the box
- Data is owned by the user only
- Data is stored on a decentralized Incentivised network
- Only the user has access to this data and thus controls how data is used
- The user gets the revenue of their data

## Development

Demo: http://fairdrive.fairdatasociety.org/

## Run locally with local API:

Ensure that you have Docker, Git and wget installed. Verify that ports 3000, 1633, 1634, 1635 are available.

1. One-liner for installing Fairdrive (Bee node, FairOS and Fairdrive): `wget https://gist.github.com/IgorShadurin/ed828b21e5904b3ad65b69e22e117e17/raw/36ac2396c7ea371559202df35108ec4b74a3e9d4/docker-compose.yml`
2. `docker compose up`
3. open http://localhost:9090 to check that FairOS is running successfully.
4. open http://localhost:3000 to view and use Fairdrive in the browser.

## How to fund your node with test tokens?

- Copy wallet from YOUR logs.
- Open official SWARM faucet https://discord.com/channels/799027393297514537/841664915218628619 and fund your wallet with 10 gBZZ + 0.5 gETH
- For gBZZ: Request in any channel “/faucet sprinkle + your address”
- For gETH: https://faucet.goerli.mudit.blog/
  If this process takes some time, which it may, please run "docker compose up" again.
  Wait until bee will deploy chequebook and this message appears "fairos_1 | time="2021-07-10T19:30:11Z" level=info msg="fairOS-dfs API server listening on port: 9090""
  Open http://localhost:9090 in your browser and you can see a few lines with information about fairOS. These lines will appear only after chequebook deployment.
