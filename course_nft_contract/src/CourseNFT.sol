// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CourseNFT is ERC721, Ownable {
    // Remove the Counters usage and replace with a simple uint256
    uint256 private _currentTokenId;

    // Mapping from token ID to course ID
    mapping(uint256 => uint256) private _courseIds;
    // Mapping from token ID to course URL
    mapping(uint256 => string) private _courseUrls;

    // Mapping from course ID to student address to token ID
    mapping(uint256 => mapping(address => uint256)) private _studentTokens;

    // Add a modifier to check if the token exists
    modifier tokenExists(uint256 tokenId) {
        require(
            _ownerOf(tokenId) != address(0),
            "CourseNFT: Query for nonexistent token"
        );
        _;
    }

    constructor() ERC721("BaseLearn", "BL") Ownable(msg.sender) {
        // Initialize the _currentTokenId to 0
        _currentTokenId = 0;
    }

    function mint(
        address student,
        uint256 courseId,
        string memory courseUrl
    ) public onlyOwner returns (uint256) {
        require(
            _studentTokens[courseId][student] == 0,
            "Student already has an NFT for this course"
        );

        // Increment the token ID manually
        _currentTokenId++;
        uint256 newTokenId = _currentTokenId;
        _safeMint(student, newTokenId);
        _courseIds[newTokenId] = courseId;
        _courseUrls[newTokenId] = courseUrl;
        _studentTokens[courseId][student] = newTokenId;
        return newTokenId;
    }

    function getCourseId(
        uint256 tokenId
    ) public view tokenExists(tokenId) returns (uint256) {
        return _courseIds[tokenId];
    }

    function getCourseUrl(
        uint256 tokenId
    ) public view tokenExists(tokenId) returns (string memory) {
        return _courseUrls[tokenId];
    }

    function getStudentTokenId(
        uint256 courseId,
        address student
    ) public view returns (uint256) {
        return _studentTokens[courseId][student];
    }
}
