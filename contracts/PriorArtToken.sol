pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract PriorArtToken is ERC721Token {

  // creates a mapping initialized to 0 for all input values
  mapping(uint256 => uint256) public proofOfPriorArtHashes;
  mapping(uint256 => uint256) public proofOfPriorArtHashesReverseMapping;

  uint256 private _nextTokenId = 1;

  constructor() public ERC721Token("PriorArtToken", "PAT") { }

  function getTokenIdForHash(uint _hash) public view returns (uint256) {
    return proofOfPriorArtHashes[_hash];
  }

  function getHashForTokenId(uint _tokenId) public view returns (uint256) {
    return proofOfPriorArtHashesReverseMapping[_tokenId];
  }

  function mint(uint _hash) public {
    if (_nextTokenId == 0) {
      revert("Rollover protection. Something something heat death of the universe?");
    }

    if (proofOfPriorArtHashes[_hash] != 0) {
      revert("Prior art already exists.");
    }

    proofOfPriorArtHashes[_hash] = _nextTokenId;
    proofOfPriorArtHashesReverseMapping[_nextTokenId] = _hash;

    _mint(msg.sender, _nextTokenId);

    _nextTokenId = _nextTokenId + 1;
  }
}
