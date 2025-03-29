//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract SolidityDataTypes {
    bool public myBool;
    uint public myUint256;
    int public myInt;
    uint8 public myUint8;
    string public myString;
    bytes public myBytes;
    address public myAddress;
    address public messageSender;

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

    function setMyString(string memory _myString) public {
        myString = _myString;
    }

    function compareStrings(string memory _myString) public view returns (bool) {
        // Convert both strings to bytes and hash them
        return keccak256(abi.encodePacked(myString)) == keccak256(abi.encodePacked(_myString));
    }

    function setMyBytes(bytes memory _myBytes) public {
        myBytes = _myBytes;
    }

    function setMyAddress(address _myAddress) public {
        myAddress = _myAddress;
    }

    function getAddressBalance() public view returns (uint) {
        return myAddress.balance;
    }

    function updateMessageSender() public {
        messageSender = msg.sender;
    }

    function multiply(uint a, uint b) public pure returns (uint) {
        return a * b;
    }
}
