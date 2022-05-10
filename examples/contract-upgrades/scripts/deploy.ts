// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  // 第一次部署合约
  const signers = await ethers.getSigners();
  const admin = signers[0];
  const TodoList = await ethers.getContractFactory("TodoList");
  const instance = await upgrades.deployProxy(TodoList, [admin.address]);
  await instance.deployed();
  console.log(`proxy deployed: ${instance.address}`);

  // 部署升级版本的合约
  // const TodoListV2 = await ethers.getContractFactory("TodoList");
  // // 第一个参数是上一次部署的proxy 地址
  // const upgraded = await upgrades.upgradeProxy(instance.address, TodoListV2);
  // await upgraded.deployed();
  // console.log(`upgraded success`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
