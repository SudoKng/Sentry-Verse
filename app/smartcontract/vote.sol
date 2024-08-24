// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        bool voted;
        uint8 vote; // 0 = no vote, 1 = Bola Ahmed Tinubu, 2 = Peter Obi
    }

    mapping(address => Voter) public voters;
    uint256 public bolaTinubuVotes;
    uint256 public peterObiVotes;

    function vote(uint8 _candidate) public {
        require(_candidate == 1 || _candidate == 2, "Invalid candidate");
        require(!voters[msg.sender].voted, "You have already voted");

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _candidate;

        if (_candidate == 1) {
            bolaTinubuVotes += 1;
        } else {
            peterObiVotes += 1;
        }
    }

    function getVotes() public view returns (uint256, uint256) {
        return (bolaTinubuVotes, peterObiVotes);
    }
}
