import { Slider, SliderItem } from "../../../common/slider/Slider";
import PopupStyleWrapper from "./Popup.style";

import coinIcon1 from "../../../assets/images/icon/pop-up-img-1.png";
import coinIcon2 from "../../../assets/images/icon/pop-up-img-2.png";
import coinIcon3 from "../../../assets/images/icon/pop-up-img-3.png";
import closeIcon from "../../../assets/images/icon/popup-close-icon.svg";

const Popup = ({ popupHandle }) => {
  const coinIcons = [coinIcon1, coinIcon2, coinIcon3];

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    fade: true,
    speed: 400,
    autoplaySpeed: 400,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <PopupStyleWrapper className="popup_wrapper">
      <div className="popup_container">
        <a
          href="https://bit.ly/3axrewr"
          className="popup_inner"
          target="_blank"
          rel="noopener"
        >
          <Slider {...settings} className="popup_slider">
            {coinIcons?.map((icon, idx) => (
              <SliderItem key={idx}>
                <div className="coin_icon">
                  <img src={icon} alt="icon" />
                </div>
              </SliderItem>
            ))}
          </Slider>

          <div className="popup_content">
            <h5>Looking For FUll Minting Functional Script ?</h5>
            <h6>React JS, Smart Contract, Solidity & Metamask Working</h6>
          </div>
        </a>

        <button onClick={() => popupHandle()} className="close_btn">
          <img src={closeIcon} alt="icon" />
        </button>
      </div>
    </PopupStyleWrapper>
  );
};

export default Popup;
