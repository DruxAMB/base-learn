// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CourseNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to course ID
    mapping(uint256 => uint256) private _courseIds;
    // Mapping from token ID to course URL
    mapping(uint256 => string) private _courseUrls;

    constructor() ERC721("CourseNFT", "CNFT") {}

    function mintCourseNFT(address student, uint256 courseId, string memory courseUrl) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(student, newTokenId);
        _courseIds[newTokenId] = courseId;
        _courseUrls[newTokenId] = courseUrl;
        return newTokenId;
    }

    function getCourseId(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "CourseNFT: Course query for nonexistent token");
        return _courseIds[tokenId];
    }

    function getCourseUrl(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "CourseNFT: Course query for nonexistent token");
        return _courseUrls[tokenId];
    }
}
