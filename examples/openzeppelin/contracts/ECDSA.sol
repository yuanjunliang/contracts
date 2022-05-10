//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ECDSAContract {
    using ECDSA for bytes32;

    function checkSignature(
        bytes memory signature,
        uint256 signatureExpTimestamp,
        uint256 roundId
    ) external view returns (address) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                signatureExpTimestamp,
                msg.sender,
                roundId,
                address(this)
            )
        );
        bytes32 messageHash = hash.toEthSignedMessageHash();
        return messageHash.recover(signature);
    }
}
