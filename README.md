# FairChance Lottery

FairChance is a blockchain-powered lottery system built on Ethereum, designed to ensure fairness, transparency, and trustless prize distribution. Utilizing Chainlink VRF for random winner selection, FairChance guarantees an unbiased and secure lottery experience.

---

## Features

- **Fairness:** Random winner selection powered by Chainlink VRF.
- **Transparency:** Built on Ethereum smart contracts, ensuring open and immutable operations.
- **Trustless Refunds:** Automatically refund players if the lottery cannot proceed.
- **Scalability:** Configurable duration, ticket price, and fees.

---

## Prerequisites

To run this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/) (for connecting to a blockchain network)

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/FairChance.git
   cd FairChance
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

4. Run tests:
   ```bash
   npx hardhat test
   ```

---

## Configuration

Ensure your `hardhat.config.ts` is correctly configured with:

- **Ethereum Network**: Add RPC URL and chain ID.
- **Chainlink VRF**: Set VRF Coordinator, LINK Token address, key hash, and fee.

Update `hardhat.config.ts`:

```typescript
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    rinkeby: {
      url: "<YOUR_INFURA_ALCHEMY_URL>",
      accounts: ["<YOUR_PRIVATE_KEY>"],
    },
  },
};
```

---

## Usage

### Deploy

1. Deploy the contract to a testnet (e.g., Rinkeby):

   ```bash
   npx hardhat run scripts/deploy.ts --network rinkeby
   ```

2. Note the deployed contract address.

### Interact

Use a frontend interface or Hardhat tasks to:

- Buy tickets
- View participants
- Select a winner
- Issue refunds

---

## File Overview

- `hardhat.config.ts`: Hardhat configuration file.
- `contracts/`: Contains the FairChance smart contract.
- `test/`: Includes unit tests for the contract.
- `scripts/`: Deployment and utility scripts.
- `package.json` and `package-lock.json`: Node.js dependency files.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- [Chainlink VRF](https://docs.chain.link/vrf/v2/introduction) for random number generation.
- [Hardhat](https://hardhat.org/) for Ethereum development tooling.
