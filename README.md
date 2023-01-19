# Paribu Hub - Smart Contract & Solidity Practicum Final Case

## Certificate dApp

I started my final case project with this project (https://github.com/ahmetenesdur/confesster-dapp) and it has evolved into the project you are currently reviewing. If you wish, you can also review this project.

The certificate project allows users to create a certificate that is linked to their Ethereum address and can be used to prove ownership of a digital asset. The project also provides a platform for users to view and manage their certificates, as well as view the transactions that have taken place on the network. Additionally, users can buy coffee for each other using the certificates, which is an innovative way of incentivizing people to use the network.

##### The project is built using the following technologies:

NextJS, ChakraUI, Solidity, Hardhat, Ether.js, Alchemy API, [IPFS - Web3 Storage](https://web3.storage/), The Graph, Etherscan and Goerli Testnet.

To see the project in action, visit the following link:

[![vercel](https://img.shields.io/badge/vercel-230?style=for-the-badge&logo=vercel&logoColor=white)](https://Certificate-dapp.vercel.app/)

To better understand watch my presentation on loom:

[![loom](https://img.shields.io/badge/loom-230?style=for-the-badge&logo=loom&logoColor=white)](https://www.loom.com/share/e42d8549c5474f3abdcf893a9aaeaecf)

<!-- GETTING STARTED -->

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

Wallet Connect Modals :
https://docs.walletconnect.com/2.0/web3modal/about or
https://www.rainbowkit.com/docs/introduction

Ethereum React Hooks :
https://wagmi.sh/react/getting-started

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/ahmetenesdur/certificate-dapp.git
    ```
2.  Install NPM packages

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3.  Create an `.env.local` file looking like this
    ```sh
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=""
    RPC_URL=""
    METAMASK_PRIVATE_KEY=""
    ETHERSCAN_API_KEY=""
    NEXT_PUBLIC_WEB3_STORAGE_TOKEN=""
    ```
4.  Compile the smart contract (I explained the contract in detail with comment lines, first check it out.)
    ```sh
    npx hardhat compile
    ```
5.  Deploy the smart contract (Examine the comment lines in the scripts.)
    ```sh
    npx hardhat run scripts/deploy.js --network goerli
    ```
6.  Verify the smart contract (Optional)
    ```sh
    npx hardhat run scripts/verify.js --network goerli
    ```
7.  Deploy subgraph to The Graph

    Guide to deploy subgraph: https://thegraph.com/docs/en/cookbook/quick-start/

8.  Get subgraph query endpoint after deployment and update it in `apollo-client.js`

    Guide to get subgraph query endpoint: https://thegraph.com/docs/en/querying/querying-from-an-application/

9.  Run the app

    ```sh
    npm run dev
    ```

    or

    ```sh
    yarn dev
    ```

10. Open the app in your browser

         http://localhost:3000

    <!-- USAGE EXAMPLES -->

## Usage

1. Connect your wallet to the app
2. Create a certificate
3. View your certificates
4. View transactions
5. Buy coffee for someone

<!-- SCREENSHOTS -->

## Screenshots

![dApp Screenshot1](https://i.imgur.com/XJ2n4ur.png)
![dApp Screenshot2](https://i.imgur.com/1CGzkrO.png)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

[![linkedin](https://img.shields.io/badge/linkedin-230?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmetenesdur/) [![github](https://img.shields.io/badge/github-230?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ahmetenesdur)
