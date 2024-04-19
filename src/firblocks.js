const Web3 = require('web3');
const FireblocksSDK = require('fireblocks-sdk').FireblocksSDK;
const Tx = require('ethereumjs-tx').Transaction;

// Initialize Web3
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

// Initialize Fireblocks SDK
const baseUrl = 'https://api.fireblocks.io';
const apiKey = 'c578baf1-22a1-42a3-98d4-decb0e95eba3';
const apiSecret =
	'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRRGV3RW1aOGVQcGNKWXEKQmRBbXVhYUtwMDU4UmdhZVQrNEdpK1R2cmtUOUVkZmdXQklwR21xdXpXaUxyY3k5R0w2ekZ0eU4vajZPdklFbwpIempuUHF2YXRta2hsT3RDQ3V1cWtPMEF0ejFkVTNIY29abE5nbm5mbmtwUTJUZFVJNnB2cnFZS0VNdjBVUDIwCkozK0xDdkcwYVFmN1VPNE1TeXFxZlQxQkl5bWo5emVQeXJ6UlR0UWJkOGRsNGdhSkpnQXB2Q3UvTnZWaldPTFkKZWFscXlSZlhtQzJ0NEt0WG5xckNpRGF6ZzVKdENqaEdXUXdUOWlxQWhiN3FDQWlNM3V5WUFQSDdoa1YzTmdNOApjL1d5ek80blI4K0FQeVZhYWRLdWx6a0NlSURicXpCckxkSHBnT05YNWcwY0pEVFMwdUVMQkpqaWRrb3RVUnU0CkdpVS9hVW8vQWdNQkFBRUNnZ0VBYzAyTnk4Wk9kNVB6NXlURExvaURFTnF4NGRwTnFyMHROTzVOUDFReUdkMlcKcFdaeFlCMXdnN09JSG1XRXlZMTVpVEtZVUZmL0Fkdko3MzdaOGJtYk04ZWdlK1dlTWIxOVovbEU5VTNrMGQ1VAozaVU0T2NzRVV5Q1l6MmpoSHdpblBOQm0ybWIvYkNSUWIyVFN2S0tab3cyTE9DZ1lVUHpIeFNDM0NIU3ZKVlBuCmtHQk5BTW1nZUYyVnFORHdTRTNPeE9EOHMxL2VKMGpSWngyMDRtbTZZMEhlc3FVWVdwSDVCTG51eHlhK2NGNEQKUWZFL1h6bEFDV3d4M2pMSUpRWGtFVmdrc0tRWlpxYUY1enUycUd4VUxMK3VQcDdDd3ZoUWExVjAyQWluZGFCcAppWDl5alVja0xZdkZ1NVBlNEVYZTR2N21nT2tUMGxZVlUwQWlKbXlab1FLQmdRRHdqRTZtcVFodkRodGVhb2dKCmRiWERURFZBczR3OHBKcEpvRjdseEVNcDVPYmprUWhlVlV6NjNBeUlFR3VwOTQwNDhRKzlkbmp5dVpPWlRWb0UKOGdWRkF2bjV5WVhGNHFWbTUxWGErbnQ0TDBNQUVRTUdYVld6M3dFZ2VLdm9yemdnMlpjMnpNRDgzdUpPK2VObgo0VDdjTm10emZRRjNpV0tDVzcrOEhtVkc0d0tCZ1FEdEQxRjhKUVo3dklKOUNXMnBObGpLZVVEL1c0Q1NXeVF5ClNkUjJqb2xWbUtYOFNxTW5BaTVJZHpxTDRzWERLQ2FNejZjc1FzN3ZRSmNWY2VjTDJNNE9LQzJYVTBwSkd3cEkKWDludW5sWWlqeWdpYlIxQzdRNnBWVU1WM3VqeExCNU9xOTlDMkhWRmpQZWsxL1NZUlFFVmhDdnN6UGJhMHpBRApSVEN2SzFreDlRS0JnQVQ1TWFzYWRaVXVPbnlpUVR2STFrQTZkQ05wVXUzeURVcVdhVC9nNWU2WXovbEdoMkRECjdMcUhFQzlELzZYYysydUErRzFYWkxySUFYZzY5RENEL0gzbnlObFVSRkxLRTlkajB3K2EvRENJOFo2dnUxdEgKVkwxS1VCQ216ZzhhaUZPTmpDWFM1KzZTZ1NWVzMwL0hoWEF5STlpWWJnNVZwZGJDSk4yejF5NDNBb0dCQU1HVQp5Yml6ejNpSnRwRCtld003OHdQY1FseUVUeGkwdm5rbVd3NDVWU0tGMWIyUkFXd2dWc1VzUDYzdGtBck9wYlJFCitjR21DSy9OTWRMOFFXMG1MUlhZYjJwc1JIUXdWWlJHV1lPRzN0VzN5MUZaZ3hTYzJtVWl6L1p6SWd1WE9HU0wKNjNQOXFMNFQ0RUpIYTJCUXNSTHQ3S1NodDA5NE4zUGtNMTVINnIxbEFvR0JBSWhRNjRTdXloSFNBOWxnV0R4Nwptb3N5WjF6ZHd6REFpSkd0TjVQTWxxOFAxd1RwREFKbW03dm96c3VkNUNJRTMrdWI2UkxwL0FIbzdxb3dFUEt0CnloWjVQMUZJeHBZeTFGemxBVk5zd3F3RkhUczJKREVpRVJsNEtsdUtkaGViVWloSnVNaldEWEx4MW1pblpZclkKTnZRbmFLelRLRlB3ZVdQRW04c3ZMcktHCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K';
const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

// Account details
const accountAddress = '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2'; // Replace with your BSC wallet address
const privateKey = Buffer.from('YOUR_PRIVATE_KEY', 'hex'); // Replace with your private key

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
	}
	// ... (other ABI entries)
];

// Create contract instance
const routerContract = new web3.eth.Contract(routerABI, routerAddress);

async function swapTokens() {
	const amountIn = web3.utils.toWei('0.01', 'ether'); // Amount of BNB to swap (0.01 BNB in this example)
	const amountOutMin = '0'; // Minimum amount of output token you want to receive
	const path = ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56']; // BNB to BUSD example
	const to = routerAddress; // PancakeSwap Router V2 address
	const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

	const nonce = await web3.eth.getTransactionCount(accountAddress);

	const tx = {
		nonce: web3.utils.toHex(nonce),
		gasLimit: web3.utils.toHex(210000),
		gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
		to: routerAddress,
		value: web3.utils.toHex(amountIn),
		data: routerContract.methods.swapExactETHForTokens(web3.utils.toHex(amountOutMin), path, to, deadline).encodeABI()
	};

	const unsignedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

	// Sign transaction using Fireblocks
	const fireblocksTx = await fireblocks.signTransaction({
		blockchain: 'ETH',
		network: 'MAINNET', // or 'TESTNET' for BSC testnet
		unsignedTransaction: unsignedTx.rawTransaction
	});

	const txHash = await web3.eth.sendSignedTransaction(fireblocksTx.signedTransaction);
	console.log('Transaction Hash:', txHash.transactionHash);
}

swapTokens().catch(console.error);
