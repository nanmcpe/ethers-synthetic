module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const synthetic = await ethers.getContract('Synthetic', deployer);
    const result = await deploy('DoppleAMZN', {
        from: deployer,
        args: [synthetic.address],
        log: true,
    });
    let tx;
    tx = await synthetic.setPairsToAddress('AMZN/USD', result.address, { from: deployer });
    console.log('setPairsToAddress: hash', tx.hash);
    tx = await synthetic.setAddressToPairs(result.address, 'AMZN/USD', { from: deployer });
    console.log('setAddressToPairs: hash', tx.hash);
    tx = await synthetic.setPairsToQuote('AMZN/USD', ['AMZN', 'USD'], { from: deployer });
    console.log('setPairsToQuote: hash', tx.hash);
};

module.exports.tags = ['DoppleAMZN'];