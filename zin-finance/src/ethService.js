const Contract_ABI = JSON.parse(process.env.REACT_APP_API_Contract_ABI);
const ContractAddress = process.env.REACT_APP_API_ContractAddress;

class EthService {
  constructor() {
    try {
      this.web3 = window.web3;
      this.contract = this.web3.eth.contract(Contract_ABI).at(ContractAddress);
      this.coinbase = this.web3.currentProvider.selectedAddress;
      this.web3.eth.defaultAccount = this.coinbase;
      this.contractInterface = this.web3.eth
        .contract(Contract_ABI)
        .at(ContractAddress);
    } catch (err) {
      console.log(err);
    }
  }

  getTokenBalance() {
    return new Promise((resolve, reject) => {
      this.contractInterface.balanceOf.call(
        "0x2dA829d1b724dDBb878F5Ce7ED7b3EF624d2FC6D",
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(Number(this.web3.fromWei(res.toNumber())));
        }
      );
    });
  }
}

export default EthService;
