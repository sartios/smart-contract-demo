//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract SolidityFallback {
    uint public lastValueSent;
    string public lastFunctionCalled;
    uint public counter;

    function callNonPayableFunction() public {
        counter++;
    }

    // Fallback function to receive Ether
    receive() external payable {
        lastValueSent = msg.value;
        lastFunctionCalled = "receive";
    }

    // Fallback function to handle calls to non-existent functions
    fallback() external payable {
        lastValueSent = msg.value;
        lastFunctionCalled = "fallback";
    }
}
