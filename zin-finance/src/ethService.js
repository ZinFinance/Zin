const Token_ABI = JSON.parse(process.env.REACT_APP_API_Token_Contract_ABI);
const Token_Address = process.env.REACT_APP_API_Token_Contract_Address;
const Crowdsale_ABI = JSON.parse(process.env.REACT_APP_Crowdsale_Contract_ABI);
const Crowdsale_Address = process.env.REACT_APP_Crowdsale_Contract_Address;

class EthService {
  constructor() {
    try {
      this.web3 = window.web3;
      this.web3.eth.getAccounts((error, accounts) => {
        this.coinbase = this.web3.currentProvider.selectedAddress;
        this.web3.eth.defaultAccount = this.coinbase;
      });
      this.tokenContract = this.web3.eth.contract(Token_ABI).at(Token_Address);

      this.crowdsaleContract = this.web3.eth
        .contract(Crowdsale_ABI)
        .at(Crowdsale_Address);
    } catch (err) {
      console.warn(err);
    }
  }

  promisify = (inner) =>
    new Promise((resolve, reject) =>
      inner((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    );

  async getTotalContribution() {
    var balance = await this.promisify((cb) => {
      if (this.crowdsaleContract) {
        return this.crowdsaleContract.weiRaised(cb);
      } else {
        return "0";
      }
    });
    return this.web3.fromWei(Number(balance), "ether");
  }

  async buyToken(eth, fromAddress) {
    try {
      if (this.coinbase.toLowerCase() !== fromAddress.toLowerCase()) {
        return "";
      }
      var tx = await this.promisify((cb) =>
        this.web3.eth.sendTransaction(
          {
            from: this.coinbase,
            to: Crowdsale_Address,
            value: this.web3.toWei(eth, "ether"),
          },
          cb
        )
      );
      return tx;
    } catch (ex) {
      console.warn(ex);
    }
  }

  convertToWei(value) {
    return this.web3.toWei(Number(value), "ether");
  }

  convertFromWei(value) {
    return Number(this.web3.fromWei(Number(value), "ether"));
  }

  async getTokenBalance() {
    var balance = await this.promisify((cb) =>
      this.tokenContract.balanceOf(this.coinbase, cb)
    );
    return this.web3.fromWei(Number(balance), "ether");
  }
}

export default EthService;
