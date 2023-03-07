// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MaticGoldUniverse is ERC20, Ownable {
    constructor() ERC20("MaticGoldUniverse", "MGUT") {
        _mint(msg.sender, 150000000 * 10 ** decimals());
    }
}
