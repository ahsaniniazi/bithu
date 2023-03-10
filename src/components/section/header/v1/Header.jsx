import { useModal } from "../../../../utils/ModalContext";
import { useEffect, useState } from "react";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import Button from "../../../../common/button";
import NavWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import logo from "../../../../assets/images/logo.png";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const { walletModalHandle } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };
  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);

  return (
    <>
      <NavWrapper className="bithu_header" id="navbar">
        <div className="container">
          {/* Main Menu Start */}
          <div className="bithu_menu_sect">
            <div className="bithu_menu_left_sect">
              <div className="logo">
                <a href="/">
                  <img src={logo} alt="bithu nft logo" />
                </a>
              </div>
            </div>
            <div className="bithu_menu_right_sect bithu_v1_menu_right_sect">
              <div className="bithu_menu_list">
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
                  <li className="submenu">
                    <a href="# ">Pages +</a>
                    <div className="sub_menu_sect">
                      <ul className="sub_menu_list">
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
                          <a href="/about">About Us </a>
                        </li>

                        <li>
                          <a href="/collections">Collections</a>
                        </li>
                        <li>
                          <a href="/roadmap">Roadmap</a>
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
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bithu_menu_btns">
                <button className="menu_btn" onClick={() => handleMobileMenu()}>
                  <MdNotes />
                </button>
                <Button sm variant="outline" className="join_btn">
                  <FaDiscord /> Join
                </Button>

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
            </div>
          </div>
          {/* <!-- Main Menu END --> */}
        </div>
      </NavWrapper>
      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
