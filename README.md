# Paribu Hub - Smart Contract & Solidity Practicum Final Case

## Certificate dApp

Certificate is a project built on top of Goerli test network and The Graph, that allows users to create, view new certifying. They can also buy coffee to each other.

##### The project is built using the following technologies:

NextJS, ChakraUI, Solidity, Hardhat, Ether.js, Alchemy API, IPFS - Web3 Storage, The Graph, Etherscan, and Goerli Testnet.

To see the project in action, visit the following link:

[![vercel](https://img.shields.io/badge/vercel-230?style=for-the-badge&logo=vercel&logoColor=white)](https://Certificate-dapp.vercel.app/)

To better understand watch my presentation on loom:

[![loom](https://img.shields.io/badge/loom-230?style=for-the-badge&logo=loom&logoColor=white)]()

<!-- GETTING STARTED -->

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ahmetenesdur/certificate-dapp.git
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. Create an `.env.local` file looking like this
   ```sh
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=""
   RPC_URL=""
   METAMASK_PRIVATE_KEY=""
   ETHERSCAN_API_KEY=""
   NEXT_PUBLIC_WEB3_STORAGE_TOKEN=""
   ```
4. Compile the smart contract
   ```sh
   npx hardhat compile
   ```
5. Deploy the smart contract
   ```sh
   npx hardhat run scripts/deploy.js --network goerli
   ```
6. Verify the smart contract (Optional)
   ```sh
   npx hardhat run scripts/verify.js --network goerli
   ```
7. Deploy subgraph (optional, since it is already deployed in hosted service)

   Guite to deploy subgraph: https://thegraph.com/docs/quick-start

8. Get subgraph query endpoint after deployment and update it in `apollo-client.js`

   Guide to get subgraph query endpoint: https://thegraph.com/docs/en/querying/querying-from-an-application/

9. Run the app

   ```sh
   npm run dev
   ```
