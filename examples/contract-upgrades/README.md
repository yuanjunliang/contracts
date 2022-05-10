# 可升级合约

- 启动节点

```
npx hardhat node
```

- 第一次部署

```
async function main() {
  // 第一次部署合约
  const signers = await ethers.getSigners();
  const admin = signers[0];
  const TodoList = await ethers.getContractFactory("TodoList");
  const instance = await upgrades.deployProxy(TodoList, [admin.address]);
  await instance.deployed();
  console.log(`proxy deployed: ${instance.address}`);
}
```

```
npx hardhat run scripts/deploy.ts --network localhost
```

- 修改完合约，第二次部署

```
async function main() {
  // 部署升级版本的合约
  const TodoListV2 = await ethers.getContractFactory("TodoList");
  // 第一个参数是上一次部署的proxy 地址
  const upgraded = await upgrades.upgradeProxy(instance.address, TodoListV2);
  await upgraded.deployed();
  console.log(`upgraded success`);
}
```

```
npx hardhat run scripts/deploy.ts --network localhost
```
