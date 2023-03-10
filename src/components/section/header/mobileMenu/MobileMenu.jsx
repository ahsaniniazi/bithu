import { useState } from "react";
import { useModal } from "../../../../utils/ModalContext";
import { FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import Button from "../../../../common/button";
import logo from "../../../../assets/images/logo.png";
import openseaIcon from "../../../../assets/images/icon/opensea.svg";

import MobileMenuStyleWrapper from "./MobileMenu.style";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const MobileMenu = ({ mobileMenuhandle }) => {
  const { walletModalHandle } = useModal();
  const [isSubmenu, setSubmenu] = useState(false);

  const handleSubmenu = () => {
    setSubmenu(!isSubmenu);
  };
  return (
    <MobileMenuStyleWrapper className="bithu_mobile_menu">
      <div className="bithu_mobile_menu_content">
        <div className="mobile_menu_logo">
          <img className="bithu_logo" src={logo} alt="bithu logo" />
          <button
            className="mobile_menu_close_btn"
            onClick={() => mobileMenuhandle()}
          >
            {" "}
            <BsXLg />{" "}
          </button>
        </div>
        <div className="bithu_mobile_menu_list">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#roadmap">Roadmap</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li className="submenu mobile_submenu" onClick={handleSubmenu}>
              <a href="# ">Pages +</a>
              <ul
                className={`sub_menu_list mobile_sub_menu_list ${isSubmenu === true && "submenu_hovered"
                  }`}
              >
                <li>
                  <a href="/">Home One</a>
                </li>
                <li>
                  <a href="/home-two">Home Two</a>
                </li>
                <li>
                  <a href="/home-three">Home Three</a>
                </li>
                <li>
                  <a href="/home-four">Home Four</a>
                </li>
                <li>
                  <a href="/home-five">Home Five</a>
                </li>
                <li>
                  <a href="/mint-1">Minting Page 1</a>
                </li>
                <li>
                  <a href="/mint-2">Minting Page 2</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/roadmap">Roadmap</a>
                </li>
                <li>
                  <a href="/collections">Collections</a>
                </li>
                <li>
                  <a href="/faq"> FAQs </a>
                </li>
                <li>
                  <a href="/coming-soon">Coming Soon</a>
                </li>
                <li>
                  <a href="/blogs">Latest Blog</a>
                </li>
                <li>
                  <a href="/post">Blog Details</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mobile_menu_social_links">
          <a href="# ">
            <img src={openseaIcon} alt="bithu social icon" />
          </a>
          <a href="# ">
            <FaTwitter />
          </a>
          <a href="# ">
            <FaDiscord />
          </a>
        </div>
        <ConnectButton
          label="Connect"
          chainStatus="none"//icon,name,none
          showBalance={false}//true,false
          accountStatus="address"//avatar,address,
        //className="connect_btn"
        />
        {/* <Button
          sm
          variant="hovered"
          className="connect_btn"
          onClick={() => walletModalHandle()}
        >
          <FaWallet /> Connect
        </Button> */}
      </div>
    </MobileMenuStyleWrapper>
  );
};

export default MobileMenu;
