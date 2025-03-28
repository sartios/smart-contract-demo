//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract SolidityDataTypes {
    bool public myBool;
    uint public myUint;

    function setMyBool(bool _myBool) public {
        myBool = _myBool;
    }

    function setMyUint(uint _myUint) public {
        myUint = _myUint;
    }
}