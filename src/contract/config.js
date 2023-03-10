import { ethers } from 'ethers';
import ContractABI from "./contractABI.json";

const contractAddress = "0xD88c24F137152B97BF33C5d500a3B5aC90dFf248";

//contract configuration
export const contractConfig = {
    address: contractAddress,
    abi: ContractABI,
}

//maximum mint per wallet
export const maxMintPerWalletCall = {
    ...contractConfig,
    functionName: 'maxMintAmount',
    watch: true,
}

//maximum supply
export const maxSupplyCall = {
    ...contractConfig,
    functionName: 'maxSupply',
    watch: true,
}

//total minted items
export const totalMintedCall = {
    ...contractConfig,
    functionName: 'totalSupply',
    watch: true,
}

//public mint cost
export const publicMintCostCall = {
    ...contractConfig,
    functionName: 'cost',
    watch: true,
}

//public mint
export const publicMint = async (mint_amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, ContractABI, signer);

    let mintCost = await nftContract.cost.call();
    let mintCostPublic = parseFloat(mintCost) / 1000000000000000000;

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    let account = accounts[0];
    let txnHash;
    
    txnHash = await nftContract.mint(mint_amount, {
        gasLimit: "285000",
        value: ethers.utils.parseEther((mintCostPublic * mint_amount).toString())
    })

    return txnHash;
}