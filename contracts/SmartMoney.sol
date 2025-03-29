//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract SmartMoney {
    constructor() payable {}

    function deposit() public payable {}

    function withdrawAll() public {
        address payable recipient = payable(msg.sender);
        recipient.transfer(address(this).balance);
    }

    function withdrawTo(address payable recipient) public {
        recipient.transfer(address(this).balance);
    }

    receive() external payable {}
    fallback() external payable {}
}
