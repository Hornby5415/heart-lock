"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_plugin_1 = require("@fhevm/hardhat-plugin");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe("EncryptedPeerReviewSepolia", function () {
    let signers;
    let contract;
    let contractAddress;
    let step;
    let steps;
    function progress(message) {
        console.log(`${++step}/${steps} ${message}`);
    }
    before(async function () {
        if (hardhat_1.fhevm.isMock) {
            console.warn("This hardhat test suite is designed to run against Sepolia");
            this.skip();
        }
        try {
            const deployment = await hardhat_1.deployments.get("EncryptedPeerReview");
            contractAddress = deployment.address;
            contract = (await hardhat_1.ethers.getContractAt("EncryptedPeerReview", deployment.address));
        }
        catch (error) {
            error.message += ". Call 'npx hardhat deploy --network sepolia'";
            throw error;
        }
        const hardhatSigners = (await hardhat_1.ethers.getSigners());
        signers = { reviewer: hardhatSigners[0] };
    });
    beforeEach(async function () {
        step = 0;
        steps = 0;
    });
    it("submits a score and decrypts aggregates", async function () {
        this.timeout(4 * 40000);
        steps = 8;
        await hardhat_1.fhevm.initializeCLIApi();
        progress("Requesting current total allowance...");
        await (await contract.connect(signers.reviewer).requestTotalAccess()).wait();
        const initialTotalData = await contract.connect(signers.reviewer).getEncryptedTotal();
        const initialCount = Number(initialTotalData[1]);
        let initialTotal = 0;
        if (initialCount > 0) {
            initialTotal = Number(await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, initialTotalData[0], contractAddress, signers.reviewer));
        }
        const score = Math.floor(Math.random() * 100);
        progress(`Encrypting score '${score}'...`);
        const encryptedScore = await hardhat_1.fhevm
            .createEncryptedInput(contractAddress, signers.reviewer.address)
            .add32(score)
            .encrypt();
        progress("Submitting encrypted score...");
        const tx = await contract
            .connect(signers.reviewer)
            .submitScore(encryptedScore.handles[0], encryptedScore.inputProof);
        await tx.wait();
        progress("Requesting updated total allowance...");
        await (await contract.connect(signers.reviewer).requestTotalAccess()).wait();
        const updatedTotalData = await contract.connect(signers.reviewer).getEncryptedTotal();
        const updatedCount = Number(updatedTotalData[1]);
        const updatedTotal = Number(await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, updatedTotalData[0], contractAddress, signers.reviewer));
        (0, chai_1.expect)(updatedCount).to.be.gte(initialCount === 0 ? 1 : initialCount);
        (0, chai_1.expect)(updatedTotal).to.be.within(0, 100 * updatedCount);
        if (initialCount > 0) {
            (0, chai_1.expect)(updatedTotal).to.not.equal(initialTotal);
        }
        progress("Requesting average access...");
        await (await contract.connect(signers.reviewer).requestAverageAccess()).wait();
        const averageData = await contract.connect(signers.reviewer).getEncryptedAverage();
        const clearAverage = Number(await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, averageData[0], contractAddress, signers.reviewer));
        (0, chai_1.expect)(Number(averageData[1])).to.equal(updatedCount);
        (0, chai_1.expect)(clearAverage).to.be.within(0, 100);
    });
});
//# sourceMappingURL=EncryptedPeerReviewSepolia.js.map