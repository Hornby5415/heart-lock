"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_plugin_1 = require("@fhevm/hardhat-plugin");
const config_1 = require("hardhat/config");
const getDeployment = async (taskArguments, hre) => {
    const { deployments } = hre;
    return taskArguments.address ? { address: taskArguments.address } : await deployments.get("EncryptedPeerReview");
};
(0, config_1.task)("peer:address", "Prints the EncryptedPeerReview contract address").setAction(async (_taskArguments, hre) => {
    const peerReview = await getDeployment(_taskArguments, hre);
    console.log(`EncryptedPeerReview address: ${peerReview.address}`);
});
(0, config_1.task)("peer:submit", "Submit or update an encrypted performance score")
    .addParam("value", "Score to submit (0-100)")
    .addOptionalParam("address", "EncryptedPeerReview contract address")
    .setAction(async (taskArguments, hre) => {
    const { ethers, fhevm } = hre;
    const score = parseInt(taskArguments.value, 10);
    if (!Number.isInteger(score) || score < 0 || score > 100) {
        throw new Error("Argument --value must be an integer between 0 and 100");
    }
    const peerReview = await getDeployment(taskArguments, hre);
    await fhevm.initializeCLIApi();
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedPeerReview", peerReview.address);
    const encryptedInput = await fhevm.createEncryptedInput(peerReview.address, signer.address).add32(score).encrypt();
    const tx = await contract.submitScore(encryptedInput.handles[0], encryptedInput.inputProof);
    console.log(`Submitting encrypted score... tx: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Transaction confirmed. status=${receipt?.status}`);
});
(0, config_1.task)("peer:my-score", "Decrypt your submitted score")
    .addOptionalParam("address", "EncryptedPeerReview contract address")
    .setAction(async (taskArguments, hre) => {
    const { ethers, fhevm } = hre;
    const peerReview = await getDeployment(taskArguments, hre);
    await fhevm.initializeCLIApi();
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedPeerReview", peerReview.address);
    const tx = await contract.requestMyScoreAccess();
    await tx.wait();
    const encryptedScore = await contract.getMyScore();
    const clearScore = await fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, encryptedScore, peerReview.address, signer);
    console.log(`Encrypted score: ${encryptedScore}`);
    console.log(`Clear score    : ${clearScore}`);
});
(0, config_1.task)("peer:average", "Decrypt the encrypted team average")
    .addOptionalParam("address", "EncryptedPeerReview contract address")
    .setAction(async (taskArguments, hre) => {
    const { ethers, fhevm } = hre;
    const peerReview = await getDeployment(taskArguments, hre);
    await fhevm.initializeCLIApi();
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedPeerReview", peerReview.address);
    const permissionTx = await contract.requestAverageAccess();
    await permissionTx.wait();
    const averageData = await contract.getEncryptedAverage();
    const average = await fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, averageData[0], peerReview.address, signer);
    console.log(`Encrypted average: ${averageData[0]}`);
    console.log(`Clear average    : ${average}`);
    console.log(`Participant count: ${averageData[1]}`);
});
(0, config_1.task)("peer:total", "Manager: decrypt the encrypted total score")
    .addOptionalParam("address", "EncryptedPeerReview contract address")
    .setAction(async (taskArguments, hre) => {
    const { ethers, fhevm } = hre;
    const peerReview = await getDeployment(taskArguments, hre);
    await fhevm.initializeCLIApi();
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedPeerReview", peerReview.address);
    const permissionTx = await contract.requestTotalAccess();
    await permissionTx.wait();
    const { 0: encryptedTotal, 1: count } = await contract.getEncryptedTotal();
    const clearTotal = await fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, encryptedTotal, peerReview.address, signer);
    console.log(`Encrypted total : ${encryptedTotal}`);
    console.log(`Clear total     : ${clearTotal}`);
    console.log(`Participant cnt : ${count}`);
});
//# sourceMappingURL=EncryptedPeerReview.js.map