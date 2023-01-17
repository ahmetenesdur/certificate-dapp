const hre = require("hardhat");
const fs = require("fs-extra");

async function main() {
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();

  await certificate.deployed();

  console.log("Certificate deployed to:", certificate.address);

  // We also save the contract's artifacts and address in the frontend directory
  // so that we can use it in our frontend
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
  process.exitCode = 1;
});
