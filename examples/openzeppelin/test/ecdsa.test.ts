import { expect } from "chai";
import { logger } from "ethers";
import { ethers } from "hardhat";

import { ECDSASign } from "./helper/signature";

// admin signer private key
const SIGNER_PRIVATE_KEY =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

describe("test ecdsa recover", function () {
  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    this.deployer = accounts[0];
    this.adminSigner = accounts[1];
    this.alice = accounts[2];

    const ECDSAContract = await ethers.getContractFactory("ECDSAContract");
    this.ecdsa = await ECDSAContract.deploy();
    await this.ecdsa.deployed();
    logger.info(`ecdsa deployed: ${this.ecdsa.address}`);
  });

  it("checkSignature", async function () {
    const roundId = 1;
    const signatureExpTimestamp = Date.now() + 20 * 60;

    const contractAddress = this.ecdsa.address;

    const types = ["uint256", "address", "uint256", "address"];
    const values = [
      signatureExpTimestamp,
      this.alice.address,
      roundId,
      contractAddress,
    ];
    const signature = ECDSASign(types, values, SIGNER_PRIVATE_KEY);
    const addr = await this.ecdsa
      .connect(this.alice)
      .checkSignature(signature, signatureExpTimestamp, roundId);
    // verifyed admin signer signed this message
    expect(addr).to.eql(this.adminSigner.address);
  });
});
