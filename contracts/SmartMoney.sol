//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

/**
 * Allow users to deposit and withdraw Ether.
 * Users can withdraw all their balance or send it to a different address.
 */
contract SmartMoney {
    mapping(address => uint) balances;

    constructor() payable {
        balances[msg.sender] = msg.value;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawAll() public {
        address payable owner = payable(msg.sender);
        _withdraw(owner, owner);
    }

    function withdrawTo(address payable recipient) public {
        address payable owner = payable(msg.sender);
        _withdraw(owner, recipient);
    }

    function _withdraw(address owner, address payable recipient) internal {
        uint withdrawalAmount = balances[owner];
        // Re-entrancy attack prevention
        balances[owner] = 0;
        recipient.transfer(withdrawalAmount);
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    fallback() external payable {
        balances[msg.sender] += msg.value;
    }
}
