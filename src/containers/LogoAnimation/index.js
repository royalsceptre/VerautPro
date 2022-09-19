import "./stylelogo.scss";
import logoHorse from "../../assets/img/logo/logo-horse.svg"
import logoTop from "../../assets/img/logo/logo-top.svg";
import logoBottom from "../../assets/img/logo/logo-bottom.svg";
import logoHorseshoes from "../../assets/img/logo/logo-horseshoes.svg";
import { useEffect, useState } from "react";
const LogoAnimation = () => {
  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    function updatePosition() {
      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    }
    setTimeout(() => {
      var dip = document.getElementsByClassName('horseshoes-group');
      dip[0].style.display = "none";
    }, 3000);
    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return (

    <div className="Logo">
      <div className="header-container">
        {/* <div className="header">Sponsored Headlines</div> */}
        {/* <div className="title-container">
          <p>Freelance Collaboration &</p>
          <p>Domain Breeding Marketplace</p>
        </div> */}
        <div className="video-wrapper">
          <div className="relative">
            <div className="logo-top-container">
              <div className="horse-container">
                {/* <img src={black} alt="black" className="black" /> */}
                <img className="logo-horse" src={logoHorse} alt="logo-horse" />
              </div>
              <img className="logo-top" src={logoTop} alt="logo-top" />
            </div>
            <img className="logo-bottom" src={logoBottom} alt="logo-bottom" />
            <div className="horseshoes-group">
              <img
                className="horseshoes1"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes2"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes3"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes4"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes5"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes6"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes7"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes8"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes9"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes10"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
              <img
                className="horseshoes11"
                src={logoHorseshoes}
                alt="logo-horseshoes"
              />
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="title">
            The World's Most Exclusive Domain Marketplace & Top Freelancer
            Network
          </div>
          <div className="arrow-down-icons">
            <span></span>
            <span className="delay1"></span>
            <span className="delay2"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LogoAnimation;