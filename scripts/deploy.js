const hre = require("hardhat");
const fs = require("fs-extra");

async function main() {
  // This line creates a new instance of the "Certificate" contract using the "hardhat" library.
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  // This line deploys the contract to the Ethereum network.
  const certificate = await Certificate.deploy();
  // This line waits for the contract to be deployed on the network.
  await certificate.deployed();

  console.log("Certificate deployed to:", certificate.address);

  // This line writes the address and the owner's address of the deployed contract to a file called "config.js" for later use.
  fs.writeFileSync(
    "config.js",
    `
    export const contractAddress = "${certificate.address}";
    export const ownerAddress = "${certificate.signer.address}";
    `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1; //This line sets the exit code to 1, indicating an error has occurred.
});
