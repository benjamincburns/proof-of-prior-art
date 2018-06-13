const PriorArtToken = artifacts.require("PriorArtToken");

contract("PriorArtToken", accounts => {
  it("Should associate a proof of existence hash with a minted token", async() => {
    let contract = await PriorArtToken.new();
    let result = await contract.mint(23) ;

    assert.equal(result.receipt.status, "0x1", "Minting the token should succeed");

    let tokenId = await contract.getTokenIdForHash.call(23);

    assert.equal(tokenId, 1, "Should have minted the first token.");

    let returnedHash = await contract.getHashForTokenId.call(tokenId);

    assert.equal(returnedHash, 23);

  })

  it("Should not mint the same token twice", async() => {
    let contract = await PriorArtToken.new();
    let result = await contract.mint(1) ;

    assert.equal(result.receipt.status, "0x1", "Minting the first token should succeed");

    try {
      // this one should fail
      result = await contract.mint(1);

      // we include this for portability to handle the geth mode of operation,
      // where failure is indicated by the transaction receipt, not by throwing
      assert.equal(result.receipt.status, "0x0");
    } catch (err) {
      assert(/revert/i.test(err.message), "Transaction for duplicate hash should revert!");
    }
  })

  it("Should mint tokens owned by the transaction sender", async() => {
    let contract = await PriorArtToken.new();
    let result = await contract.mint(1) ;

    assert.equal(result.receipt.status, "0x1", "Minting the token should succeed");

    let tokenId = await contract.getTokenIdForHash.call(1);
    let tokenOwner = await contract.ownerOf.call(tokenId);

    assert.equal(tokenOwner, accounts[0]);
  })
})
