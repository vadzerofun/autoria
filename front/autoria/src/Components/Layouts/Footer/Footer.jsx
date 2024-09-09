import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

import GooglePlay from '../../../assets/images/footer/google-play.png';
import AppStore from '../../../assets/images/footer/app-store.png';
import Facebook from '../../../assets/icons/footer/facebook.svg';
import Twitter from '../../../assets/icons/footer/twitter.svg';
import YouTube from '../../../assets/icons/footer/youtube.svg';
import Instagram from '../../../assets/icons/footer/instagram.svg';
import Tiktok from '../../../assets/icons/footer/tiktok.svg';
import Pinterest from '../../../assets/icons/footer/pinterest.svg';

export const Footer = () => {
  return (
    <footer className="bg-secondary footerFont">
      <Container>
        <Row>
          <Col className="footerLeft" lg={6} md={12}>
            <Container>
              <Row className="footerLeftRow">
                <Col>
                  <Link>Вживані авто</Link>
                  <Link>Нові авто</Link>
                  <Link>Сільгосптехніка</Link>
                  <Link>Послуги для авто</Link>
                  <Link>Сервіси</Link>
                </Col>
                <Col>
                  <Link>Новини</Link>
                  <Link>Відгуки про авто</Link>
                  <Link>Мапа сайту</Link>
                  <Link>Банк ідей</Link>
                </Col>
              </Row>
              <Row className="footerLeftRow footerLeftCopyright">
                <span>©Drive Dreams</span>
              </Row>
            </Container>
          </Col>
          <Col className="footerRight">
            <div>
              <span className="footerRightTitle">Допоможи нам покращити наш сайт</span>
            </div>
            <Button className="footerRightButton" variant="outline-primary" href="#">
              Залишити відгук
            </Button>
            <div className="footerRightImages">
              <div className="footerRightSocialMedia">
                <Link to="#">
                  <img src={Facebook} alt="Facebook Icon" />
                </Link>
                <Link to="#">
                  <img src={Twitter} alt="Twitter Icon" />
                </Link>
                <Link to="#">
                  <img src={YouTube} alt="YouTube Icon" />
                </Link>
                <Link to="#">
                  <img src={Instagram} alt="Instagram Icon" />
                </Link>
                <Link to="#">
                  <img src={Tiktok} alt="Tiktok Icon" />
                </Link>
                <Link to="#">
                  <img src={Pinterest} alt="Pinterest Icon" />
                </Link>
              </div>
              <div className="footerRightDownload">
                <Link to="#">
                  <div className="footerRightDownloadButton">
                    <img src={AppStore} alt="App Store Button" />
                  </div>
                </Link>
                <Link to="#">
                  <div className="footerRightDownloadButton">
                    <img src={GooglePlay} alt="Google Play Button" />
                  </div>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
