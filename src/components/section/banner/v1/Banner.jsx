import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";

import characterThumb from "../../../../assets/images/nft/Character1.png";
import mintLiveDownArrow from "../../../../assets/images/nft/mint_live_down_arrow.svg";
import mintLiveText from "../../../../assets/images/nft/mint_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";

import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { useState, useEffect } from "react";
import {
  maxSupplyCall,
  totalMintedCall,
  maxMintPerWalletCall,
  publicMintCostCall,
} from "../../../../contract/config";

const Banner = () => {
  const { mintModalHandle } = useModal();

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
      if (maxSupplyData && totalMintedData) {
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

  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="bithu_v1_baner_left">
              <h2>Crazy Meta 🎯 NFT collections</h2>
              <h3>
                <span className="count">
                  <Counter end={totalMinted} duration={totalMinted} />
                </span>{" "}
                / {totalSupply} Minted
              </h3>
              <div className="banner_buttons">
                <Button lg variant="mint" onClick={() => mintModalHandle()}>
                  {" "}
                  Mint now
                </Button>
                <Button lg variant="outline">
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
          <div className="col-lg-6">
            <div className="bithu_v1_baner_right">
              <div className="bithu_v1_baner_right_img_sect">
                <div className="mint_live_circle_sect">
                  <div className="mint_live_circle">
                    <span>
                      <img src={mintLiveDownArrow} alt="" />
                    </span>
                    <span className="mint_live_text rotated-style">
                      <img src={mintLiveText} alt="" />
                    </span>
                  </div>
                </div>
                <div className="bithu_v1_baner_right_img_bg">
                  <img src={homeImageBG} alt="" />
                </div>
                <div className="bithu_v1_baner_right_img">
                  <img src={characterThumb} alt="avater" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerV1Wrapper>
  );
};

export default Banner;
