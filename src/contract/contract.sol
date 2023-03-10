// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BithuContract is ERC721Enumerable, Ownable {
    using Strings for uint256;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    string public baseURI;
    string public baseExtension = ".json";
    string public notRevealedURI;

    uint256 public cost = 0.001 ether;
    uint256 public maxSupply = 1000;
    uint256 public maxMintAmount = 5;

    bool public revealed = false;
    bool public paused = false;
    mapping(address => bool) public whitelisted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _notRevealedURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_notRevealedURI);
        _safeMint(msg.sender, 1);
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // public
    function mint(uint256 _mintAmount) public payable {
        require(!revealed);
        require(!paused);
        require(_mintAmount > 0);
        require(balanceOf(msg.sender) + _mintAmount <= maxMintAmount);
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply);

        if (msg.sender != owner()) {
            if (whitelisted[msg.sender] != true) {
                require(msg.value >= cost * _mintAmount);
            }
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
            _tokenIds.increment();
        }

        require(payable(owner()).send(address(this).balance));
    }

    function count() public view returns (uint256) {
        return _tokenIds.current();
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();

        if (revealed) {
            return
                bytes(currentBaseURI).length > 0
                    ? string(
                        abi.encodePacked(
                            currentBaseURI,
                            tokenId.toString(),
                            baseExtension
                        )
                    )
                    : "";
        } else {
            return notRevealedURI;
        }
    }

    //only owner
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setNotRevealedURI(string memory _newNotRevealedURI)
        public
        onlyOwner
    {
        notRevealedURI = _newNotRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setReveal() public onlyOwner {
        revealed = !revealed;
    }

    function setPause() public onlyOwner {
        paused = !paused;
    }

    function addWhitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = true;
    }

    function removeWhitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = false;
    }

    function withdraw() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}