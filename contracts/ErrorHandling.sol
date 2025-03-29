//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract WillThrow {
    error NotAllowedError(string);

    function validationThrows() public pure {
        require(false, "This function always throws");
    }

    function assertionThrows() public pure {
        assert(false);
    }

    function customLogicThrows() public pure {
        revert NotAllowedError("NotAllowed");
    }
}

contract ErrorHandling {
    event ValidationError(string reason);
    event AssertionError(uint code);
    event CustomError(bytes lowLevelData);

    WillThrow willThrow = new WillThrow();

    function catchValidationError() public {
        try willThrow.validationThrows() {
            // This block will not be executed
        } catch Error(string memory reason) {
            emit ValidationError(reason);
        }
    }

    function catchAssertionError() public {
        try willThrow.assertionThrows() {
            // This block will not be executed
        } catch Panic(uint code) {
            emit AssertionError(code);
        }
    }

    function catchCustomError() public {
        try willThrow.customLogicThrows() {
            // This block will not be executed
        } catch (bytes memory lowLevelData) {
            emit CustomError(lowLevelData);
        }
    }
}
