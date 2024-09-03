import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import useMediaQuery from '../../../Hooks/useMediaQuery';

export const ContactSellerButton = ({car, icon}) => {
  // Tooltip button
  const [showContact, setShowContact] = useState(false);
  const contactTarget = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 992px)');
  // console.log(isDesktop);  

  // click
  const handleButtonClick = () => {
    if (!isDesktop) {
      // For mobile devices, open phone dialer
      window.location.href = `tel:${car.sellerPhone}`;
    } else {
      // For desktop devices, toggle tooltip
      setShowContact(!showContact);
    }
  };

  return (
    <>
      <Button
        className="carGallerySellerBtn"
        ref={contactTarget}
        onClick={handleButtonClick}>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <img className="carGallerySellerBtnIcon" src={icon} alt="Chat Icon" />
          <span className="fs-5">Зв’язатись з продацвем</span>
        </div>
      </Button>
      <Overlay target={contactTarget.current} show={showContact} placement="bottom">
        {(props) => (
          <Tooltip id="seller-phone" {...props}>
            {`Телефон: ${car.sellerPhone}`}
            {car.sellerPhoneExtra && <br/>}
            {car.sellerPhoneExtra && `Дод. телефон: ${car.sellerPhoneExtra}`}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};
