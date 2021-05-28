# Dopple Synthetic

## Installation
- `git clone https://github.com/nanmcpe/dopple-synthetic.git`
- `cd dopple-synthetic`
- `yarn install`

## Requirements
- Dolly address (to deploy, run `hh deploy --tags Dolly`)
- Synthetic asset address (to deploy, run `hh deploy --tags DoppleTSLA,DoppleCOIN,DoppleAAPL,DoppleQQQ,DoppleAMZN,DoppleXAU`)
- Band oracle reference address [click here for more details](https://docs.bandchain.org/band-standard-dataset/supported-blockchains.html)
- Create `.secret` file and provide credential following

```
{
    "infuraProjectId": "",
    "alchemyProjectId": "",
    "privateKey": [
        "",
        "",
        "",
        ""
        ],
    "etherApiKey": "",
    "bscApiKey": ""
}

```

# Deployment
- Run `hh deploy`

# Runing the unit tests
- Run `hh test` (some tests are required "Kovan network forked" to get Oracle price).

## Features
- Can mint synthetic asset by provide 150% of collateral (adjustable). (e.g. provide $DOLLY -> receive $dTSLA)
- Can redeem (fully or partial) of synthetic asset to get collateral back. (e.g. repay $DOLLY -> burn $dTSLA)
- Can add more collateral by provide backed asset ($DOLLY) for extend liquidation ratio.
- Can remove some collateral whereas the collateral ratio still satisfy.
- Can liquidate open contract that hit the liquidation ratio.
- Liquidation fee will be transfered to dev address (optional).
- Can adjust some parameters e.g. `collateralRatio`, `liquidationRatio`, `liquidatorRewardRatio`, `platfromFeeRatio`, `remainingToMinterRatio`.

## TODO
- ✅ Add reentrancy guard.
- ⏰ Use factory pattern for synthetic asset contracts.
- ⏰ Fix [this issue](https://github.com/nanmcpe/dopple-synthetic/issues/2).
- ⏰ Add more unit test!!
- ⏰ Gathering and monitor liquidation of minted asset (for liquidate bot).
- ⏰ Add function `mintMoreSynthetic()` and `redeemSomeSynthetic()` corresponding of user's collateral ratio.
- ⏰ Make simple UI.
- ⏰ Use [Chainlink oracle](https://docs.chain.link/docs/binance-smart-chain-addresses) for standby (or combine) mode.

## Step by step explanation
1. Get deploayed `Dolly` instance 
2. Deploy `Synthetic` contract by giving `Dolly address` and `Band oracle reference`
3. Verify `Synthetic` contract
4. Get deploayed `Synthetic Token` instance 
5. call function `setPairsToAddress(string <Pairs>, address syntheticAsset)` to `Synthetic` contract.
6. call function `setAddressToPairs(address syntheticAsset, string <Pairs>)` to `Synthetic` contract.
7. call function `setPairsToQuote(string pairs, string[2] pairs)` to `Synthetic` contract. _TSLA/USD', ['TSLA', 'USD']_
8. call function `approve(address synthetic, uint256 amount)` to `Dolly` contract. _for minting purpose._
9. call function `approve(address synthetic, uint256 amount)` to `Synthetic Asset` contract. _for redeeming purpose (burned by synthetic contract)._
10. call function `setSyntheticAddress(address synthetic)` to `Synthetic Asset` contract. _for only Synthetic contract can mint synthetic asset._

## Deployed contract (Kovan Testnet)
- Dolly: [0x9a54482dbB3710A4C207d57A07be6413768f14E5](https://kovan.etherscan.io/address/0x9a54482dbB3710A4C207d57A07be6413768f14E5#code)
- Synthetic: [0x9b644189D230BF9a937fc429f4Aeb5B68D1E432C](https://kovan.etherscan.io/address/0x9b644189D230BF9a937fc429f4Aeb5B68D1E432C#code)
- dTSLA: [0x23D68Fb0A5266C6dE8cF5391f9af833f3990aE22](https://kovan.etherscan.io/address/0x23D68Fb0A5266C6dE8cF5391f9af833f3990aE22#code)
- dCOIN: [0xD46650753c30D183D1f83d698Db3B634AE1271dc](https://kovan.etherscan.io/address/0xD46650753c30D183D1f83d698Db3B634AE1271dc#code)
- dAAPL: [0xfFABc951A44F692a209f6260DE2DaBF95E0E0d2B](https://kovan.etherscan.io/address/0xfFABc951A44F692a209f6260DE2DaBF95E0E0d2B#code)
- dQQQ: [0x89Ff826079a08E3Dc8aC56490B45FD7C9434E169](https://kovan.etherscan.io/address/0x89Ff826079a08E3Dc8aC56490B45FD7C9434E169#code)
- dAMZN: [0x976386e2B14317C9b773A65DB3590e3CCF5cbA01](https://kovan.etherscan.io/address/0x976386e2B14317C9b773A65DB3590e3CCF5cbA01#code)
- dXAU: [0x3AC0E5c8662A88037b80353Fd3D1429a4fB51c94](https://kovan.etherscan.io/address/0x3AC0E5c8662A88037b80353Fd3D1429a4fB51c94#code)

## Miscellaneous
- Deployer: [0xad1F66Acea98733D63cd8FC522118e4014Cb3F79](https://kovan.etherscan.io/address/0xad1F66Acea98733D63cd8FC522118e4014Cb3F79)
- Minter: [0xa11cec4fF714C34775318544e97842344A9F3aDc](https://kovan.etherscan.io/address/0xa11cec4fF714C34775318544e97842344A9F3aDc)
- Liquidator: [0xb0b38D35775d93eC72928d2Cf9619fb3291aD8D6](https://kovan.etherscan.io/address/0xb0b38D35775d93eC72928d2Cf9619fb3291aD8D6)
- Developer: [0xca101e15B0A9b091624122eEa12FC981Fee77523](https://kovan.etherscan.io/address/0xca101e15B0A9b091624122eEa12FC981Fee77523)

## Diagrams
![](https://raw.githubusercontent.com/nanmcpe/dopple-synthetic/main/diagrams/Minting.png)
![](https://raw.githubusercontent.com/nanmcpe/dopple-synthetic/main/diagrams/Redeeming.png)
![](https://raw.githubusercontent.com/nanmcpe/dopple-synthetic/main/diagrams/Liquidating.png)
