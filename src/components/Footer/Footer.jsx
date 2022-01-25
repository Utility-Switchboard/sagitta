import React from "react";
import { FaPhoneAlt as Phone } from "react-icons/fa";
import { FaPencilAlt as Pencil } from "react-icons/fa";
import { FaFacebookSquare as Facebook } from "react-icons/fa";
import { FaTwitterSquare as Twitter } from "react-icons/fa";
import { FaLinkedin as LinkedIn } from "react-icons/fa";
import { FaYoutubeSquare as YouTube } from "react-icons/fa";
import smartPlanSquare from "../../assets/img/smart-plan-square.png";

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-inner-container body-inner-width">
          <img style={{ width: "60%" }} src={smartPlanSquare} />

          <span id="call-us-foot">
            <h3>
              <Phone /> Call us today
            </h3>

            <h4>Customer service</h4>
            <a href="tel:+443337726247">0333&nbsp;772&nbsp;6247</a>

            <br />
            <br />

            <h4>New customers</h4>
            <a href="tel:+443337726247">0333&nbsp;772&nbsp;6247</a>
          </span>

          <span id="write-to-us-foot">
            <h3>
              <Pencil /> Write to us
            </h3>

            <h4>By email</h4>
            <a href="mailto:hello@smart-plan.com">hello@smart-plan.com</a>

            <br />
            <br />

            <h4>By post</h4>
            <p>
              2nd Floor, Melrose House
              <br />
              42 Dingwall Road
              <br />
              Croydon
              <br />
              CR0 2NE
            </p>
          </span>

          <span id="about-us-foot">
            <h4>About us</h4>
            <ul>
              <li>
                <a href="#">About Smart Plan</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Terms of use</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Cookies policy</a>
              </li>
            </ul>

            <h4>Our products</h4>
            <ul>
              <li>
                <a href="#">See our plans</a>
              </li>
              <li>
                <a href="#">New boiler installation</a>
              </li>
              <li>
                <a href="#">Help & Advice</a>
              </li>
            </ul>
          </span>

          <span id="social-foot">
            <Facebook />
            <LinkedIn />
            <Twitter />
            <YouTube />
          </span>

          <p className="footer-legal-notice">
            Smart Plan is a trading style of UK Boiler Company Ltd.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
