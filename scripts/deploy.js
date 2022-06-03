const hre = require("hardhat");

async function main() {

  const Domains = await hre.ethers.getContractFactory("Domains");
  const dm_contract = await Domains.deploy("pongthsa");

  await dm_contract.deployed();

  console.log("Domain-Name Smart Contract deployed to:", dm_contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
