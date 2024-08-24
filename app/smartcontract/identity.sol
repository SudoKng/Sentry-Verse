// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserDetails {
    struct User {
        string name;
        uint age;
        string phone;
        string idDigits;
        string company;
        string passportHash;
    }

    mapping(address => User) public users;
    mapping(address => bool) public registered;

    event UserRegistered(address indexed userAddress, string name);

    function storeUserDetails(
        string memory _name,
        uint _age,
        string memory _phone,
        string memory _idDigits,
        string memory _company,
        string memory _passportHash
    ) public {
        require(!registered[msg.sender], "User already registered.");

        users[msg.sender] = User(_name, _age, _phone, _idDigits, _company, _passportHash);
        registered[msg.sender] = true;

        emit UserRegistered(msg.sender, _name);
    }

    function getUserDetails(address userAddress) public view returns (User memory) {
        require(registered[userAddress], "User not registered.");
        return users[userAddress];
    }
}
