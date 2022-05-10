import { ethers } from "hardhat";
import * as ethUtil from "ethereumjs-util";

export function ECDSASign(
  types: Array<string>,
  values: Array<any>,
  privateKey: string
): Buffer {
  const digest = ethers.utils.keccak256(
    ethers.utils.solidityPack(types, values)
  );
  console.log({ digest });
  const prefixedHash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(digest));
  const { v, r, s } = ethUtil.ecsign(
    prefixedHash,
    Buffer.from(privateKey, "hex")
  );
  const vb = Buffer.from([v]);
  const signature = Buffer.concat([r, s, vb]);
  return signature;
}
