import { useModal } from "../../../../utils/ModalContext";
import { Slider, SliderItem } from "../../../../common/slider/Slider";
import CoinInfoSlider from "../../coinInfoSlider";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";

import heartIcon from "../../../../assets/images/icon/v5-hart-icon.svg";
import thumb1 from "../../../../assets/images/nft/emoji-img1.png";
import thumb2 from "../../../../assets/images/nft/emoji-img2.png";
import thumb3 from "../../../../assets/images/nft/emoji-img3.png";

import particle1 from "../../../../assets/images/icon/v5-thunder-icon.svg";
import particle2 from "../../../../assets/images/icon/v5-star-icon.svg";
import particle3 from "../../../../assets/images/icon/v5-coin-icon.svg";

import { useAccount, useContractRead } from 'wagmi';
import { useState, useEffect } from "react";
import {
  maxSupplyCall,
  totalMintedCall,
  maxMintPerWalletCall,
  publicMintCostCall,
} from "../../../../contract/config";

const Banner = () => {
  const { mintModalHandle } = useModal();

  const slideImages = [thumb1, thumb2, thumb3];

  const settings = {
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

  const [totalSupply, setTotalSupply] = useState(5555);
  const [totalMinted, setTotalMinted] = useState(5555);
  const [remainingItem, setRemainingItem] = useState(5555);
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
      if(maxMintPerWalletData){
        setMaxMintPerWallet(maxMintPerWalletData.toString());
      }
      if(publicMintCostData){
        setPublicMintCost(publicMintCostData.toString() / 1000000000000000000);
      }
    }
  })

  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row banner_row">
          <div className="col-lg-6 order-1 order-lg-0">
            <div className="bithu_v5_baner_left">
              <h2>
                BUILD & SELL YOUR EVERY PIXEL <img src={heartIcon} alt="icon" />
              </h2>
              <h3>
                <span className="count">
                  <Counter end={totalMinted} duration={totalMinted} />
                </span>{" "}
                / {totalSupply} Minted
              </h3>
              <div className="banner_buttons">
                <Button sm variant="mint" onClick={() => mintModalHandle()}>
                  {" "}
                  Mint now
                </Button>
                <Button sm variant="outline">
                  Wishlist now
                </Button>
              </div>
              <div className="coin-info">
                <span>Max {maxMintPerWallet} NFTs per wallet . Price {publicMintCost} ETH + gas</span>
                <span>
                  MINT IS LIVE{" "}
                  <span className="highlighted">UNTIL 25 APR 04:00H</span>
                </span>
                <span>Presale : SOLDOUT</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-0 order-lg-1">
            <div className="bithu_v5_baner_right">
              <Slider {...settings}>
                {slideImages?.map((thumb, idx) => (
                  <SliderItem key={idx}>
                    <div className="banner_nft_thumb">
                      <img src={thumb} alt="thumb" />
                    </div>
                  </SliderItem>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <CoinInfoSlider />

      {/* particles  */}
      <span className="particle_star particle_1">
        <img src={particle1} alt="icon" />
      </span>
      <span className="particle_star particle_2">
        <img src={particle2} alt="icon" />
      </span>
      <span className="particle_star particle_3">
        <img src={particle3} alt="icon" />
      </span>
      {/* particles  */}
    </BannerV1Wrapper>
  );
};

export default Banner;
