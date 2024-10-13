// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/CourseNFT.sol";

contract CourseNFTTest is Test {
    CourseNFT public courseNFT;
    address public owner = address(1);
    address public student = address(2);

    function setUp() public {
        vm.prank(owner);
        courseNFT = new CourseNFT();
    }

    function testMintCourseNFT() public {
        uint256 courseId = 1;
        
        vm.prank(owner);
        uint256 tokenId = courseNFT.mintCourseNFT(student, courseId);
        
        assertEq(courseNFT.ownerOf(tokenId), student);
        assertEq(courseNFT.getCourseId(tokenId), courseId);
    }

    function testGetCourseId() public {
        uint256 courseId = 1;
        
        vm.prank(owner);
        uint256 tokenId = courseNFT.mintCourseNFT(student, courseId);
        
        assertEq(courseNFT.getCourseId(tokenId), courseId);
    }

    function testFailMintAsNonOwner() public {
        vm.prank(student);
        courseNFT.mintCourseNFT(student, 1);
    }
}