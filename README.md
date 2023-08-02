
# Fairdrive

At the intersection of innovation, interoperability, and decentralization, Fairdrive emerges for the cause of fair data. This initiative, driven by the community, is dedicated to promoting freedom. By facilitating decentralized storage, it allows developers to construct interoperable, decentralized, and open-source dApps. This, in turn, enables users to regain their privacy, assume ownership of their data, and control their digital identity.

[Login here](https://app.fairdrive.fairdatasociety.org)

### What is Fairdrive

Fairdrive is a decentralized application (dApp) that facilitates distributed storage on the Swarm network. It features a "Drive" interface for managing pods, files and folders. Internally, Fairdrive uses Fair Data Protocol, which is built on top of Ethereum Swarm. 

### Why Fairdrive
#### Pros
- **Data Encryption**: Fairdrive encrypts all data by default, providing an additional layer of security for your files.
- **Data Ownership**: Unlike traditional cloud storage services, where your data is technically owned by the service provider, with Fairdrive, you are the sole owner of your data.
- **Decentralized Storage**: Fairdrive stores data on the Swarm decentralized network. This means your data isn't stored in a single location, but is distributed across multiple nodes, enhancing data security and reliability.
- **User Control**: Only you have access to your data. You control who can access your data and how it's used.

#### Cons
- **Speed**: Due to its decentralized nature, Fairdrive can be slower than traditional cloud storage services. This is because data isn't stored in a single location, but is distributed across multiple nodes in the Swarm network. As a result, it can take longer to retrieve data.
- **Learning Curve**: As a decentralized application (dApp), Fairdrive might have a steeper learning curve for users who are not familiar with blockchain technology and decentralized networks.
- **Dependence on Swarm Network**: The performance and reliability of Fairdrive are dependent on the Swarm network. If there are issues with the network, it could affect the availability and performance of Fairdrive.
- **Data Recovery**: In case of loss of access keys, data recovery might be challenging or impossible due to the decentralized and encrypted nature of the storage.

### How does it work

Fairdrive works very similar to other cloud storage services, yet with some big differences:
- Data is encrypted out of the box
- Data is owned by the user only
- Data is stored on a Swarm decentralized network
- Only the user has access to data and thus controls how data is used

## Getting Help

If you need help using Fairdrive as user, check out [User Guide](docs/USER-GUIDE.md) and [FAQ](docs/FAQ.md). See [Getting Started](docs/GETTING-STARTED.md). 
Technical overview of [Design](docs/DESIGN.md), [Functionality](docs/FUNCTIONALITY.md) and [Architecture](docs/ARCHITECTURE.md). 

If you can't find the answer to your question, feel free to [contact us](docs/CONTACT.md).





## Development

Please install `fdp-play`, be sure to use Node 16 and have Docker environment setup and verify that ports 3000, 1633, 1634, 1635 are available.
Testnet deployment : http://app.fairdrive.dev.fairdatasociety.org/

- `npm i -g @fairdatasociety/fdp-play`
- `fdp-play start --fresh`

#### Post installation steps
How to initialize [Postage batch](docs/POSTAGE-BATCH.md).
#### Goerli contract configuration
How to init [Goerli](docs/INIT-GOERLI.md).

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


### Active Deployments

- **Mainnet**: https://app.fairdrive.fairdatasociety.org
- **Development**: https://app.fairdrive.dev.fairdatasociety.org



