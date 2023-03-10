import { useState } from "react";
import { useModal } from "../../../../utils/ModalContext";

import CountdDown from "../../../../common/countDown"
import Button from "../../../../common/button";
import Particle from "../../../../common/particle/v2";

import bannerThumb1 from "../../../../assets/images/banner/Item1.png";
import bannerThumb2 from "../../../../assets/images/banner/Item2.png";
import bannerThumb3 from "../../../../assets/images/banner/Item3.png";
import BannerStyleWrapper from "./Banner.style";

import { useAccount, useContractRead } from 'wagmi';
import { useEffect } from "react";
import {
  maxSupplyCall,
  totalMintedCall,
  maxMintPerWalletCall,
  publicMintCostCall,
  publicMint,
} from "../../../../contract/config";

const Banner = () => {
  const { mintModalHandle } = useModal();
  let [count, setCount] = useState(1);
  let [price, setPrice] = useState("0.001");

  const [totalSupply, setTotalSupply] = useState(9999);
  const [totalMinted, setTotalMinted] = useState(4583);
  const [remainingItem, setRemainingItem] = useState(4583);
  const [maxMintPerWallet, setMaxMintPerWallet] = useState(2);
  const [publicMintCost, setPublicMintCost] = useState(0.09);

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();

  const { data: maxSupplyData } = useContractRead({ ...maxSupplyCall })
  const { data: totalMintedData } = useContractRead({ ...totalMintedCall })
  const { data: maxMintPerWalletData } = useContractRead({ ...maxMintPerWalletCall })
  const { data: publicMintCostData } = useContractRead({ ...publicMintCostCall })

  useEffect(() => {
    if (isConnected) {
      if (maxSupplyData) {
        setTotalSupply(maxSupplyData.toString());
      }
      if (totalMintedData) {
        setTotalMinted(totalMintedData.toString());
      }
      if(maxSupplyData && totalMintedData){
        setRemainingItem(totalSupply - totalMinted);
      }
      if (maxMintPerWalletData) {
        setMaxMintPerWallet(maxMintPerWalletData.toString());
      }
      if (publicMintCostData) {
        setPublicMintCost(publicMintCostData.toString() / 1000000000000000000);
      }
    }
  })

  const decreaseCount = () => {
    count -= 1;
    price = publicMintCost * count;
    if (count < 1) {
      count = 1;
      setCount(1);
      setPrice(publicMintCost);
    }
    else {
      setCount(count);
      setPrice(price);
    }
  }

  const increaseCount = () => {
    count += 1;
    price = publicMintCost * count;
    if (count > maxMintPerWallet) {
      count = maxMintPerWallet;
      setPrice(publicMintCost * maxMintPerWallet);
    }
    else {
      setCount(count);
      setPrice(price);
    }
  }

  const mintNow = async () => {
    try {
      if (isConnected) {
        let txn = await publicMint(count);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BannerStyleWrapper className="bithu_v3_baner_sect" id="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="banner-image-area3">
              {/* particles component */}
              <Particle />
              <img
                className="banner-image banner-image1"
                src={bannerThumb1}
                alt="bithu banner thumb"
              />
              <img
                className="banner-image banner-image2"
                src={bannerThumb2}
                alt="bithu banner thumb"
              />
              <img
                className="banner-image banner-image3"
                src={bannerThumb3}
                alt="bithu banner thumb"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-conent3">
              <h4 className="banner-subtitle text-uppercase">
                Whitelist : <span className="red-color">Soldout</span>
              </h4>
              <h1 className="banner-title text-uppercase">Mint is live now</h1>
              <div className="bithu_v3_timer">
                <h5 className="text-uppercase">Public Mint end in</h5>
                <div className="timer">
                  <CountdDown date={Date.now() + 1675076996} />
                </div>
              </div>
              <div className="banner-count-inner d-flex align-items-center">
                <div className="banner-btn-area">
                  <span
                    className="input-number-decrement"
                    onClick={() => decreaseCount()}
                  >
                    –
                  </span>
                  <input
                    className="input-number"
                    type="text"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                  <span
                    className="input-number-increment"
                    onClick={() => increaseCount()}
                  >
                    +
                  </span>
                </div>
                <div className="bithu_v3_baner_buttons">
                  <Button lg variant="mint" onClick={() => mintNow()}>
                    Mint Now
                  </Button>
                </div>
              </div>
              <div className="banner-bottom-text text-uppercase">
                Public Mint {publicMintCost} Eth + Gas Floor Price 2.08 Eth
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerStyleWrapper>
  );
};

export default Banner;
