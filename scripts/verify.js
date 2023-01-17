const hre = require("hardhat");

const contractAddress = "0x66e724fC670bC762DE2423E04DDDc519A4d88029";

async function main() {
    await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
    });

    console.log("Contract verified!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});