const hre = require("hardhat")
const {ethers} = require("hardhat")

async function main(){
    const TELLOR_ADDRESS="0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A"

    let tellorContractFactory = await ethers.getContractFactory("UsingTellorApp")

    let tellorContract = await tellorContractFactory.deploy(TELLOR_ADDRESS)
    await tellorContract.deployed()
    console.log(tellorContract.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })