import web3 from "web3";

const Token_ABI = JSON.parse(process.env.REACT_APP_API_Token_Contract_ABI);
const Token_Address = process.env.REACT_APP_API_Token_Contract_Address;
const Crowdsale_ABI = JSON.parse(process.env.REACT_APP_Crowdsale_Contract_ABI);
const Crowdsale_Address = process.env.REACT_APP_Crowdsale_Contract_Address;

class EthService {
  constructor() {
    if (window.web3) {
      try {
        this.web3 = window.web3;
        this.web3.eth.getAccounts((error, accounts) => {
          window.metamaskAccount = accounts[0];
        });
        this.tokenContract = this.web3.eth
          .contract(Token_ABI)
          .at(Token_Address);
        this.crowdsaleContract = this.web3.eth
          .contract(Crowdsale_ABI)
          .at(Crowdsale_Address);
      } catch (err) {
        console.warn(err);
      }
    }
  }

  setMetaMaskAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.metamaskAccount = accounts[0];
  };

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
    if (this.crowdsaleContract) {
      var balance = await this.promisify((cb) =>
        this.crowdsaleContract.weiRaised(cb)
      );
      return web3.utils.fromWei(String(balance), "ether");
    } else {
      return 0;
    }
  }

  async buyToken(eth, fromAddress) {
    try {
      if (
        !window.metamaskAccount ||
        window.metamaskAccount.toLowerCase() !== fromAddress.toLowerCase()
      ) {
        return "";
      }
      var tx = await this.promisify((cb) =>
        this.web3.eth.sendTransaction(
          {
            from: window.metamaskAccount,
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
    return web3.utils.toWei(String(value ? value : 0), "ether");
  }

  convertFromWei(value) {
    return Number(web3.utils.fromWei(String(value ? value : 0), "ether"));
  }

  async getTokenBalance() {
    if (window.metamaskAccount) {
      var balance = await this.promisify((cb) =>
        this.tokenContract.balanceOf(window.metamaskAccount, cb)
      );
      return Number(this.web3.fromWei(Number(balance), "ether"));
    } else {
      return 0;
    }
  }
}

export default EthService;
