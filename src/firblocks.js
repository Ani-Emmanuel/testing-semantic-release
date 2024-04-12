const Web3 = require('web3');
const FireblocksSDK = require('fireblocks-sdk');
const Tx = require('ethereumjs-tx').Transaction;

// Initialize Web3
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

// Initialize Fireblocks SDK
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const fireblocks = new FireblocksSDK(apiKey, apiSecret);

// Account details
const accountAddress = '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2';  // Replace with your BSC wallet address
const privateKey = Buffer.from('YOUR_PRIVATE_KEY', 'hex');  // Replace with your private key

// Contract details
const routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';  // PancakeSwap Router V2 address
const routerABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "getAmountsOut",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // ... (other ABI entries)
];

// Create contract instance
const routerContract = new web3.eth.Contract(routerABI, routerAddress);

async function swapTokens() {
    const amountIn = web3.utils.toWei('0.01', 'ether');  // Amount of BNB to swap (0.01 BNB in this example)
    const amountOutMin = '0';  // Minimum amount of output token you want to receive
    const path = ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'];  // BNB to BUSD example
    const to = routerAddress;  // PancakeSwap Router V2 address
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

    const unsignedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Sign transaction using Fireblocks
    const fireblocksTx = await fireblocks.signTransaction({
        blockchain: 'ETH',
        network: 'MAINNET',  // or 'TESTNET' for BSC testnet
        unsignedTransaction: unsignedTx.rawTransaction,
    });

    const txHash = await web3.eth.sendSignedTransaction(fireblocksTx.signedTransaction);
    console.log('Transaction Hash:', txHash.transactionHash);
}

swapTokens().catch(console.error);
