//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract SolidityDataTypes {
    bool public myBool;
    uint public myUint256;
    int public myInt;
    uint8 public myUint8;

    function setMyBool(bool _myBool) public {
        myBool = _myBool;
    }

    function setMyUint256(uint _myUint256) public {
        myUint256 = _myUint256;
    }

    function setMyInt(int _myInt) public {
        myInt = _myInt;
    }

    function decreaseMyUint8() public {
        unchecked {
            myUint8--;
        }
    }
}
