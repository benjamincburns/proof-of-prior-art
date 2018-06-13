const PriorArtToken = artifacts.require("PriorArtToken");

module.exports = async function(deployer) {
  return deployer.then(async() => {
    await deployer.deploy(PriorArtToken);
  })
}
