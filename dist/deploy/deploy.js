"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const func = async function (hre) {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;
    const deployedPeerReview = await deploy("EncryptedPeerReview", {
        from: deployer,
        log: true,
    });
    console.log(`EncryptedPeerReview contract: `, deployedPeerReview.address);
};
exports.default = func;
func.id = "deploy_encrypted_peer_review";
func.tags = ["EncryptedPeerReview"];
//# sourceMappingURL=deploy.js.map