//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import "./Ownable.sol";

contract InheritanceModifierExample is Owner {
    mapping(address => uint) public balances;
    uint tokenPrice = 1 ether;

    constructor() {
        balances[owner] = 100;
    }

    function createNewToken() public onlyOwner {
        balances[owner] += 1;
    }

    function burnToken() public onlyOwner {
        require(balances[owner] > 0, "No tokens to burn");
        balances[owner]--;
    }
}
