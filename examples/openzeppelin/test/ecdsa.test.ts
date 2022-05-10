import { expect } from "chai";
import { logger } from "ethers";
import { ethers } from "hardhat";

import { ECDSASign } from "./helper/signature";

const DEPLOYER_PRIVATE_KEY =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

describe("test ecdsa recover", function () {
  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    this.deployer = accounts[0];

    const ECDSAContract = await ethers.getContractFactory("ECDSAContract");
    const ecdsa = await ECDSAContract.deploy();
    await ecdsa.deployed();
    this.ecdsa = ecdsa;
    logger.info(`ecdsa deployed: ${ecdsa.address}`);
  });

  it("checkSignature", async function () {
    const roundId = 1;
    const signatureExpTimestamp = Date.now() + 20 * 60;

    const contractAddress = this.ecdsa.address;

    const types = ["uint256", "address", "uint256", "address"];
    const values = [
      signatureExpTimestamp,
      this.deployer.address,
      roundId,
      contractAddress,
    ];
    const signature = ECDSASign(types, values, DEPLOYER_PRIVATE_KEY);
    const addr = await this.ecdsa.checkSignature(
      signature,
      signatureExpTimestamp,
      roundId
    );
    expect(addr).to.eql(this.deployer.address);
  });
});
