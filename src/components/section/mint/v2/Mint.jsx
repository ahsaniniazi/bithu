import { useState } from "react";
import CountdDown from "../../../../common/countDown"
import { useModal } from "../../../../utils/ModalContext";
import { Slider, SliderItem } from "../../../../common/slider/Slider";
import Button from "../../../../common/button";
import Particle from "./Particles";
import MintStyleWrapper from "./Mint.style";

import thumb1 from "../../../../assets/images/nft/v4-slider-img.png";
import thumb2 from "../../../../assets/images/nft/v4-slider-img2.png";
import thumb3 from "../../../../assets/images/nft/v4-slider-img3.png";
import checkIcon from "../../../../assets/images/icon/mint-right-text-icon.svg";
import discordIcon from "../../../../assets/images/icon/dis_logo.svg";
import twitterIcon from "../../../../assets/images/icon/Twitter.svg";

import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { useEffect } from "react";
import {
  maxSupplyCall,
  totalMintedCall,
  maxMintPerWalletCall,
  publicMintCostCall,
  publicMint,
} from "../../../../contract/config";

const Mint = () => {
  let [count, setCount] = useState(1);
  let [price, setPrice] = useState(0.001);
  const { mintModalHandle } = useModal();

  const slideImages = [thumb1, thumb2, thumb3];

  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 500,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleChenge = () => { };

  const [totalSupply, setTotalSupply] = useState(9999);
  const [totalMinted, setTotalMinted] = useState(4583);
  const [remainingItem, setRemainingItem] = useState(4583);
  const [maxMintPerWallet, setMaxMintPerWallet] = useState(2);
  const [publicMintCost, setPublicMintCost] = useState(0.15);

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
      if(maxMintPerWalletData){
        setMaxMintPerWallet(maxMintPerWalletData.toString());
      }
      if(publicMintCostData){
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
    <MintStyleWrapper>
      <Particle />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mint_left_content">
              <div className="mint_left_inner">
                <div className="mint_slider">
                  <Slider {...sliderSettings}>
                    {slideImages?.map((thumb, idx) => (
                      <SliderItem key={idx}>
                        <div className="mint_thumb">
                          <img src={thumb} alt="thumb" />
                        </div>
                      </SliderItem>
                    ))}
                  </Slider>
                </div>
                <ul className="mint_count_list">
                  <li>
                    <h5>Remaining</h5> 
                    <h5>
                      {remainingItem} / <span>{totalSupply}</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5>{publicMintCost} ETH</h5>
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button
                        className="input_number_decrement"
                        onClick={() => decreaseCount()}
                      >
                        -
                      </button>
                      <input
                        className="input_number"
                        type="text"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                      />
                      <button
                        className="input_number_increment"
                        onClick={() => increaseCount()}
                      >
                        +
                      </button>
                    </div>
                    <h5>
                      <span>{parseFloat(price).toFixed(3)}</span> ETH
                    </h5>
                  </li>
                </ul>
                <Button lg variant="mint" onClick={() => mintNow()}>
                  {" "}
                  Mint now
                </Button>
                <p>
                  By clicking “MINT”, You agree to our{" "}
                  <a href="#">Terms of Service</a> and our{" "}
                  <a href="#">Privacy Policy.</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mint_right_content">
              <div className="content_header">
                <h4>
                  WHITELIST : SOLDOUT
                  <span>
                    <img src={checkIcon} alt="icon" />
                  </span>
                </h4>
                <h4>
                  Presale : SOLDOUT
                  <span>
                    <img src={checkIcon} alt="icon" />
                  </span>
                </h4>

                <h1>PUBLIC MINT LIVE</h1>
              </div>

              <div className="mint_timer">
                <h5>Public Mint End in</h5>
                <CountdDown date={Date.now() + 1675076996} />
              </div>
              <div className="content_footer">
                <h5>Max {maxMintPerWallet} NFTs per wallet</h5>
                <h5>Price {publicMintCost} ETH + gas</h5>
                <h5>Mint is live until 25 apr 04:00H</h5>
              </div>
              <div className="mint_btns">
                <Button lg variant="outline">
                  <img src={discordIcon} alt="icon" />
                  join discord
                </Button>
                <Button lg variant="outline">
                  <img src={twitterIcon} alt="icon" />
                  join twitter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MintStyleWrapper>
  );
};

export default Mint;
