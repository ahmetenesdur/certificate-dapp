// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certificate {
    string public name = "Certificate ";
    uint public constant coffeePrice = 0.01 ether;

    using Counters for Counters.Counter;
    Counters.Counter public certificationCount;
    Counters.Counter public coffeesCount;

    mapping(uint256 => Certification) public certification;

    struct Certification {
        uint256 id;
        string hash;
        string message;
        string category;
        address author;
        address holder;
        uint256 timestamp;
    }

    event CertificationCreated(
        uint256 id,
        string hash,
        string message,
        string category,
        address author,
        address holder,
        uint256 timestamp
    );

    event CoffeeBought(
        uint256 id,
        address buyer,
        address holder,
        string message,
        uint256 timestamp
    );

    constructor() {
        console.log("Deploying a Certificate ...");
    }

    function createCertification(
        string memory _message,
        string memory _hash,
        string memory _category,
        address _holder
    ) public {
        // Make validations
        require(bytes(_message).length > 0, "Message must not be empty");
        require(bytes(_hash).length > 0, "Hash must not be empty");
        require(bytes(_category).length > 0, "Category must not be empty");
        require(msg.sender != address(0x0), "Sender must not be empty");

        // Increment the Certification count
        certificationCount.increment();
        uint256 id = certificationCount.current();

        // Create the Certification
        certification[id] = Certification(
            id,
            _hash,
            _message,
            _category,
            msg.sender,
            _holder,
            block.timestamp
        );
        // Trigger an event
        emit CertificationCreated(
            id,
            _hash,
            _message,
            _category,
            msg.sender,
            _holder,
            block.timestamp
        );
    }

    function buyCoffee(address _holder, string memory _message) public payable {
        // Make Validations
        require(bytes(_message).length > 0, "Message must not be empty");
        require(msg.sender != address(0x0), "Sender must not be empty");
        require(msg.value == coffeePrice, "Coffee price must be 0.0001 ether");
        require(msg.sender != _holder, "You can't buy coffee for yourself");

        // Increment the coffee count
        coffeesCount.increment();
        uint256 id = coffeesCount.current();

        // Send the author the coffee price
        payable(_holder).transfer(msg.value);

        // Trigger an event
        emit CoffeeBought(id, msg.sender, _holder, _message, block.timestamp);
    }
}
