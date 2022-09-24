const { AbiCoder, defaultAbiCoder } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

async function main() {

  // https://docs.tellor.io/tellor/getting-data/funding-a-feed

  /** ------ SETUP FEED SOLIDITY ARGUMENTS ------
   * @dev Initializes dataFeed parameters.
   * @param _queryId unique identifier of desired data feed
   * @param _reward tip amount per eligible data submission
   * @param _startTime timestamp of first autopay window
   * @param _interval amount of time between autopay windows
   * @param _window amount of time after each new interval when reports are eligible for tips
   * @param _priceThreshold amount price must change to automate update regardless of time (negated if 0, 100 = 1%)
   * @param _queryData the data used by reporters to fulfill the query
   * ------------------------------------
   */

  /** ------ FUND FEED SOLIDITY ARGUMENTS ------
     * @dev Allows dataFeed account to be filled with tokens
     * @param _feedId unique feed identifier
     * @param _queryId identifier of reported data type associated with feed
     * @param _amount quantity of tokens to fund feed
     * ------------------------------------------
     */

    let tx
    let feedId, amount
    let queryId, reward, startTime, interval, window, priceThreshold, queryData

    queryData = "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000124e756d65726963417069526573706f6e7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002768747470733a2f2f7269636b616e646d6f7274796170692e636f6d2f6170692f657069736f646500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b696e666f2c20636f756e74000000000000000000000000000000000000000000"
    queryId = "0xec418244aa2251ea52b1aa75aef3c423d0d11172f78c44580915abcd4b6bfba6" // https://queryidbuilder.herokuapp.com/custom
    reward = BigInt(1E17)
    startTime = (await ethers.provider.getBlock("latest")).timestamp
    //2 day window every 3 days
    interval = 86400 * 3
    window = 86400 * 2
    priceThreshold = 0 // simpler feed!

    //our contract addresses
    const AUTOPAY = "0x7B49420008BcA14782F2700547764AdAdD54F813" //autopay on rinkeby
    const TOKEN = "0x7b8ac044ebce66acdf14197e8de38c1cc802db4a" //token on rinkeby

    //connecting to our contracts
    let autopay = await ethers.getContractAt("contracts/interfaces/ITellor.sol:ITellor", AUTOPAY)
    let token = await ethers.getContractAt("contracts/interfaces/ITellor.sol:ITellor", TOKEN)

    // setup data feed
    tx = await autopay.setupDataFeed(queryId, reward, startTime, interval, window, priceThreshold, queryData)
    await tx.wait()
    console.log("feed setup!! at: ", tx.hash)

    // make feed id
    feedId = ethers.utils.keccak256(defaultAbiCoder.encode(
      [
          "bytes32", "uint256", "uint256", "uint256", "uint256", "uint256"
      ],
      [
          queryId, reward, startTime, interval, window, priceThreshold
      ]
    ))

    //fund it!....should last a while!
    amount = BigInt(1E18)
    tx = await token.approve(AUTOPAY, amount)
    console.log("tokens approved!! at:", tx.hash)

    tx = await autopay.fundFeed(feedId, queryId, amount)
    await tx.wait()
    console.log("feed funded!! at: ", tx.hash)


  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });