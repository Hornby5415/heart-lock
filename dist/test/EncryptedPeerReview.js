"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_plugin_1 = require("@fhevm/hardhat-plugin");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
async function deployFixture() {
    const factory = (await hardhat_1.ethers.getContractFactory("EncryptedPeerReview"));
    const contract = (await factory.deploy());
    const contractAddress = await contract.getAddress();
    return { contract, contractAddress };
}
describe("EncryptedPeerReview", function () {
    let signers;
    let contract;
    let contractAddress;
    before(async function () {
        const all = (await hardhat_1.ethers.getSigners());
        signers = { manager: all[0], alice: all[1], bob: all[2] };
    });
    beforeEach(async function () {
        if (!hardhat_1.fhevm.isMock) {
            console.warn("EncryptedPeerReview test suite requires the FHEVM mock environment");
            this.skip();
        }
        ({ contract, contractAddress } = await deployFixture());
    });
    it("initialises with zero participants", async function () {
        const participantCount = await contract.participantCount();
        (0, chai_1.expect)(participantCount).to.equal(0);
        const managerHasSubmitted = await contract.hasSubmitted(signers.manager.address);
        (0, chai_1.expect)(managerHasSubmitted).to.equal(false);
    });
    it("accepts encrypted submissions, aggregates totals, and computes averages", async function () {
        await hardhat_1.fhevm.initializeCLIApi();
        const aliceScore = 80;
        const bobScore = 60;
        const aliceEncrypted = await hardhat_1.fhevm
            .createEncryptedInput(contractAddress, signers.alice.address)
            .add32(aliceScore)
            .encrypt();
        await (await contract.connect(signers.alice).submitScore(aliceEncrypted.handles[0], aliceEncrypted.inputProof)).wait();
        const afterAlice = await contract.connect(signers.alice).getEncryptedAverage();
        const aliceAverage = await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, afterAlice[0], contractAddress, signers.alice);
        (0, chai_1.expect)(aliceAverage).to.equal(aliceScore);
        (0, chai_1.expect)(afterAlice[1]).to.equal(1);
        const bobEncrypted = await hardhat_1.fhevm
            .createEncryptedInput(contractAddress, signers.bob.address)
            .add32(bobScore)
            .encrypt();
        await (await contract.connect(signers.bob).submitScore(bobEncrypted.handles[0], bobEncrypted.inputProof)).wait();
        const bobAverageData = await contract.connect(signers.bob).getEncryptedAverage();
        const bobAverage = await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, bobAverageData[0], contractAddress, signers.bob);
        (0, chai_1.expect)(bobAverage).to.equal((aliceScore + bobScore) / 2);
        (0, chai_1.expect)(bobAverageData[1]).to.equal(2);
        await (await contract.connect(signers.manager).requestTotalAccess()).wait();
        const totalData = await contract.connect(signers.manager).getEncryptedTotal();
        const clearTotal = await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, totalData[0], contractAddress, signers.manager);
        (0, chai_1.expect)(totalData[1]).to.equal(2);
        (0, chai_1.expect)(clearTotal).to.equal(aliceScore + bobScore);
        await (await contract.connect(signers.alice).requestAverageAccess()).wait();
        const refreshedAverageData = await contract.connect(signers.alice).getEncryptedAverage();
        const refreshedAverage = await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, refreshedAverageData[0], contractAddress, signers.alice);
        (0, chai_1.expect)(refreshedAverage).to.equal((aliceScore + bobScore) / 2);
    });
    it("updates submissions and keeps participant count stable", async function () {
        await hardhat_1.fhevm.initializeCLIApi();
        const initialScoreBob = 55;
        const updatedScoreBob = 72;
        const aliceScore = 90;
        const encrypt = async (score, signer) => hardhat_1.fhevm.createEncryptedInput(contractAddress, signer.address).add32(score).encrypt();
        const aliceEnc = await encrypt(aliceScore, signers.alice);
        await (await contract.connect(signers.alice).submitScore(aliceEnc.handles[0], aliceEnc.inputProof)).wait();
        const bobFirst = await encrypt(initialScoreBob, signers.bob);
        await (await contract.connect(signers.bob).submitScore(bobFirst.handles[0], bobFirst.inputProof)).wait();
        const countAfterInitial = await contract.participantCount();
        (0, chai_1.expect)(countAfterInitial).to.equal(2);
        const managerTotalFirst = await contract.connect(signers.manager).getEncryptedTotal();
        const clearTotalFirst = await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, managerTotalFirst[0], contractAddress, signers.manager);
        (0, chai_1.expect)(clearTotalFirst).to.equal(aliceScore + initialScoreBob);
        const bobUpdated = await encrypt(updatedScoreBob, signers.bob);
        await (await contract.connect(signers.bob).submitScore(bobUpdated.handles[0], bobUpdated.inputProof)).wait();
        const countAfterUpdate = await contract.participantCount();
        (0, chai_1.expect)(countAfterUpdate).to.equal(2);
        await (await contract.connect(signers.manager).requestTotalAccess()).wait();
        const managerTotalFinal = await contract.connect(signers.manager).getEncryptedTotal();
        const clearTotalFinal = await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, managerTotalFinal[0], contractAddress, signers.manager);
        (0, chai_1.expect)(clearTotalFinal).to.equal(aliceScore + updatedScoreBob);
        await (await contract.connect(signers.bob).requestAverageAccess()).wait();
        const averageData = await contract.connect(signers.bob).getEncryptedAverage();
        const clearAverage = await hardhat_1.fhevm.userDecryptEuint(hardhat_plugin_1.FhevmType.euint32, averageData[0], contractAddress, signers.bob);
        (0, chai_1.expect)(clearAverage).to.equal((aliceScore + updatedScoreBob) / 2);
    });
});
//# sourceMappingURL=EncryptedPeerReview.js.map