require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-spdx-license-identifier');
require('hardhat-deploy');
require('hardhat-deploy-ethers');
const { removeConsoleLog } = require('hardhat-preprocessor');
const fs = require('fs');
const { infuraProjectId, alchemyProjectId, privateKey, etherApiKey, bscApiKey } = JSON.parse(fs.readFileSync('.secret').toString().trim());

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: `https://kovan.infura.io/v3/${infuraProjectId}`,
      },
      saveDeployments: true,
      tags: ["test", "local"],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraProjectId}`,
      accounts: privateKey,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: privateKey,
      saveDeployments: true,
      tags: ["test", "local"],
    }
  },
  namedAccounts: {
    deployer: 0,
    minter: 1,
    liquidator: 2,
    developer: 3,
  },
  solidity: {
    version: '0.6.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
    deploy: './deploy',
    deployments: './deployments',
    imports: './imports'
  },
  mocha: {
    timeout: 100000 // liquidation test on Mainnet consume time around 100 seconds
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherApiKey
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
  preprocess: {
    eachLine: removeConsoleLog((hre) => hre.network.name !== 'hardhat' && hre.network.name !== 'localhost'),
  },
};