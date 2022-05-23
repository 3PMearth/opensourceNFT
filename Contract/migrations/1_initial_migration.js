const Migrations = artifacts.require("./Migrations.sol");
const MyERC721 = artifacts.require("./MyERC721.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MyERC721);
};