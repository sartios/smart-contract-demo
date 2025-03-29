//SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

/**
 * Allow users to deposit and withdraw Ether.
 * Users can withdraw all their balance or send it to a different address.
 */
contract SmartMoney {
    struct Transaction {
        uint amount;
        address recipient;
        uint timestamp;
    }

    struct Balance {
        uint totalBalance;
        uint depositCounter;
        mapping(uint => Transaction) deposits;
        uint withdrawalCounter;
        mapping(uint => Transaction) withdrawals;
    }

    mapping(address => Balance) balances;
    struct Identity {
        string name;
        string email;
    }
    mapping(address => Identity) identities;

    constructor() payable {
        Transaction memory initialDeposit = Transaction(msg.value, msg.sender, block.timestamp);
        balances[msg.sender].deposits[balances[msg.sender].depositCounter] = initialDeposit;
        balances[msg.sender].depositCounter++;
        balances[msg.sender].totalBalance = msg.value;
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        Transaction memory _deposit = Transaction(msg.value, msg.sender, block.timestamp);
        balances[msg.sender].totalBalance += msg.value;
        balances[msg.sender].deposits[balances[msg.sender].depositCounter] = _deposit;
        balances[msg.sender].depositCounter++;
    }

    function withdrawAll() public {
        address payable owner = payable(msg.sender);
        _withdraw(owner, owner);
    }

    function withdrawTo(address payable recipient) public {
        address payable owner = payable(msg.sender);
        _withdraw(owner, recipient);
    }

    function setUserIdentity(string memory name, string memory email) public {
        identities[msg.sender] = Identity(name, email);
    }

    function getUserIdentity() public view returns (string memory, string memory) {
        Identity memory identity = identities[msg.sender];
        return (identity.name, identity.email);
    }

    function getDeposits() public view returns (Transaction[] memory) {
        Balance storage userBalance = balances[msg.sender];
        Transaction[] memory depositsArray = new Transaction[](userBalance.depositCounter);
        for (uint i = 0; i < userBalance.depositCounter; i++) {
            depositsArray[i] = userBalance.deposits[i];
        }
        return depositsArray;
    }

    function getWithdrawals() public view returns (Transaction[] memory) {
        Balance storage userBalance = balances[msg.sender];
        Transaction[] memory withdrawalsArray = new Transaction[](userBalance.withdrawalCounter);
        for (uint i = 0; i < userBalance.withdrawalCounter; i++) {
            withdrawalsArray[i] = userBalance.withdrawals[i];
        }
        return withdrawalsArray;
    }

    receive() external payable {
        _processRandomDeposit(msg.sender, msg.value);
    }

    fallback() external payable {
        _processRandomDeposit(msg.sender, msg.value);
    }

    function _processRandomDeposit(address sender, uint amount) internal {
        balances[sender].deposits[balances[sender].depositCounter] = Transaction(amount, sender, block.timestamp);
        balances[sender].depositCounter++;
        balances[sender].totalBalance += amount;
    }

    function _withdraw(address owner, address payable recipient) internal {
        uint withdrawalAmount = balances[owner].totalBalance;
        require(withdrawalAmount > 0, "No balance to withdraw");

        // Re-entrancy attack prevention
        Transaction memory withdrawal = Transaction(withdrawalAmount, recipient, block.timestamp);
        balances[owner].withdrawals[balances[owner].withdrawalCounter] = withdrawal;
        balances[owner].withdrawalCounter++;
        balances[owner].totalBalance = 0;
        assert(balances[owner].totalBalance == 0);

        recipient.transfer(withdrawalAmount);
    }
}
