import contract from "../contract/contractABI.json";
import { ethers } from "ethers";
import { isMetaMaskInstalled } from "../lib/metamaskhandler";

const ethereum = typeof window !== "undefined" ? window.ethereum : "";

export const my_mint = async (mint_amount) => {
  if (isMetaMaskInstalled()) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractAddress = "0xd210Ae8252f8F806a192B6F88D072EA92155B09C";

    const nftContract = new ethers.Contract(contractAddress, contract, signer);
    console.log(nftContract);
    let txnHash = await nftContract.mint(
      ethereum.selectedAddress,
      mint_amount,
      {
        gasLimit: "285000",
        value: ethers.utils.parseEther((0.001 * mint_amount).toString()),
      }
    );

    // console.log(txnHash);
    return txnHash;
  }
  //   console.log(txnHash);
  //   console.log("minted");
};

export const my_count = async () => {
  if (isMetaMaskInstalled()) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractAddress = "0xd210Ae8252f8F806a192B6F88D072EA92155B09C";
    const nftContract = new ethers.Contract(contractAddress, contract, signer);

    let totalMint = await nftContract.count();

    return totalMint;
  }
};
