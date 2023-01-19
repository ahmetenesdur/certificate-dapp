// SPDX-License-Identifier: UNLICENSED

// This line specifies that the code is written in Solidity version 0.8.9 or higher.
pragma solidity ^0.8.9;

// This is used for logging messages to the console.
import "hardhat/console.sol";
// This is used for maintaining a counter for certifications and coffees.
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certificate {
    string public name = "Certificate";
    // This line creates a public constant variable "coffeePrice" of type uint, and sets its value to 0.01 ether.
    uint public constant coffeePrice = 0.01 ether;

    // These lines use the "Counters" library to create two counters: "certificationCount" and "coffeesCount". Both are of type "Counter" and are publicly accessible.
    using Counters for Counters.Counter;
    Counters.Counter public certificationCount;
    Counters.Counter public coffeesCount;

    // This line creates a public mapping "certification" of type "uint256" to "Certification". This is used for storing the certification information.
    mapping(uint256 => Certification) public certification;

    // This line defines a struct "Certification" which is used to store certification information.
    struct Certification {
        uint256 id;
        string hash;
        string message;
        string category;
        address author;
        address holder;
        uint256 timestamp;
    }

    // This line creates an event "CertificationCreated" which is emitted when a new certification is created.
    event CertificationCreated(
        uint256 id,
        string hash,
        string message,
        string category,
        address author,
        address holder,
        uint256 timestamp
    );

    // This line creates an event "CoffeeBought" which is emitted when a coffee is bought.
    event CoffeeBought(
        uint256 id,
        address buyer,
        address holder,
        string message,
        uint256 timestamp
    );

    // This line creates the constructor function for the contract, which is called when the contract is deployed. It logs a message "Deploying a Certificate ..." to the console.
    constructor() {
        console.log("Deploying a Certificate ...");
    }

    // This function allows a user to create a certification. It takes "message", "hash", "category" and "holder" and is marked as "public" so it can be called by anyone.
    function createCertification(
        string memory _message,
        string memory _hash,
        string memory _category,
        address _holder
    ) public {
        require(bytes(_message).length > 0, "Message must not be empty");
        require(bytes(_hash).length > 0, "Hash must not be empty");
        require(bytes(_category).length > 0, "Category must not be empty");
        require(msg.sender != address(0x0), "Sender must not be empty");

        // Increment the Certification count.
        certificationCount.increment();
        // This line increments the certification counter and sets the value of "id" to the current value of the certification counter.
        uint256 id = certificationCount.current();

        // This line stores the certification information in the mapping "certification" using the "id" as the key.
        certification[id] = Certification(
            id,
            _hash,
            _message,
            _category,
            msg.sender,
            _holder,
            block.timestamp
        );

        // This line emits the "CertificationCreated" event, passing the certification information as parameters.
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

    // This function allows a user to buy a coffee for someone else. It takes "holder" and "message" as parameters and is marked as "public" and "payable" so it can be called by anyone and accept ether as payment.
    function buyCoffee(address _holder, string memory _message) public payable {
        require(bytes(_message).length > 0, "Message must not be empty");
        require(msg.sender != address(0x0), "Sender must not be empty");
        require(msg.value == coffeePrice, "Coffee price must be 0.01 ether");
        require(msg.sender != _holder, "You can't buy coffee for yourself");

        // Increment the coffee count.
        coffeesCount.increment();
        uint256 id = coffeesCount.current();

        // This line sends the "coffeePrice" value in ether to the "holder" address.
        payable(_holder).transfer(msg.value);

        // Trigger an event.
        emit CoffeeBought(
            id, msg.sender,
            _holder,
            _message,
            block.timestamp
        );
    }
}
