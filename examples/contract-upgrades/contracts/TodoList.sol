//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TodoList is Initializable {
    string[] private list;
    address public admin;

    event AddTodo(address indexed author, string item);

    function initialize(address _admin) external initializer {
        admin = _admin;
    }

    function addTodo(string memory message) external {
        list.push(message);
        emit AddTodo(msg.sender, message);
    }

    function getTodoList() external view returns (string[] memory totoList) {
        totoList = list;
    }

    // 相比V1 增加了获取列表长度的方法
    // function getTodoListLength() external view returns(uint256) {
    //     return list.length;
    // }
}
