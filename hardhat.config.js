require('dotenv').config()
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: ["0x"+process.env.PRIVATE_KEY],
    },
  //   rinkeby: {
  //     url: process.env.ALCHEMY_RINKEBY_URL,
  //     accounts: ["0x"+process.env.PRIVATE_KEY]
  //  }
   
  },
}
