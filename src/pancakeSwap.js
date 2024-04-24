const { Web3 } = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

// Initialize Web3
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

// Account details
const accountAddress = 'YOUR_WALLET_ADDRESS';
const privateKey = Buffer.from('YOUR_PRIVATE_KEY', 'hex');

// Contract details
const routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'; // PancakeSwap Router V2 address
const routerABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'getAmountsOut',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amountOutMin',
				type: 'uint256'
			},
			{
				internalType: 'address[]',
				name: 'path',
				type: 'address[]'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256'
			}
		],
		name: 'swapExactETHForTokens',
		outputs: [
			{
				internalType: 'uint256[]',
				name: 'amounts',
				type: 'uint256[]'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	}
];

// Create contract instance
const routerContract = new web3.eth.Contract(routerABI, routerAddress);

async function swapTokens() {
  const amountIn = web3.utils.toWei('0.01', 'ether');  // Amount of BNB to swap (0.01 BNB in this example)
  const amountOutMin = '0';  // Minimum amount of output token you want to receive
  const path = ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'];  // BNB to BUSD example
  const to = accountAddress;  // Your wallet address
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;  // 20 minutes from the current Unix time

  const nonce = await web3.eth.getTransactionCount(accountAddress);

  const tx = {
      nonce: web3.utils.toHex(nonce),
      gasLimit: web3.utils.toHex(210000),
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      to: routerAddress,
      value: web3.utils.toHex(amountIn),
      data: routerContract.methods.swapExactETHForTokens(
          web3.utils.toHex(amountOutMin),
          path,
          to,
          deadline
      ).encodeABI(),
  };

  const transaction = new Tx(tx, { chain: 'bsc' });
  transaction.sign(privateKey);

  const serializedTx = transaction.serialize().toString('hex');
  const txHash = await web3.eth.sendSignedTransaction('0x' + serializedTx);
  console.log('Transaction Hash:', txHash.transactionHash);
}

swapTokens().catch(console.error);
