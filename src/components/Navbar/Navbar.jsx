import React from "react";
//import { AiFillCaretDown as CaretDown} from "react-icons/ai";
import logo from "../HomePage/images/smart-plan-logo.png";
import { FaMobileAlt as Phone } from "react-icons/fa";
import { FaBars as Hamburger } from "react-icons/fa";
import { FaTimes as Cross } from "react-icons/fa";
import { FaArrowRight as ArrowRight } from "react-icons/fa";

const links = [
  {
    name: "Boiler cover",
    url: "boiler-cover",
    dropdown: true,
    //dropdownClass: <CaretDown className="navCaret-icon" />
  },
  {
    name: "Help & Advice",
    url: "advice",
    dropdown: false,
    //dropdownClass: null
  },
  {
    name: "New boilers",
    url: "new-boiler",
    dropdown: true,
    //dropdownClass: <CaretDown className="navCaret-icon" />
  },
  {
    name: "Manage your account",
    url: "account",
    dropdown: false,
    //dropdownClass: null
  },
];

function MobNavButton(props) {
  if (props.currentState == false) {
    return (
      <button className="hamburger-menu" onClick={props.handleChange}>
        Menu <Hamburger />
      </button>
    );
  } else {
    return (
      <ul className="mobile-menu">
        <button className="hamburger-menu" onClick={props.handleChange}>
          Close <Cross />
        </button>

        <h2>Menu</h2>
        {links.map((link) => (
          <React.Fragment>
            <a href={link.url}>
              <li
              //className={link.dropdownClass}
              >
                <ArrowRight />
                {link.name}
                {link.dropdownClass}
              </li>
            </a>
          </React.Fragment>
        ))}
      </ul>
    );
  }
}

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.state.mobileMenu
      ? this.setState({ mobileMenu: false })
      : this.setState({ mobileMenu: true });
  }

  render() {
    return (
      <React.Fragment>
        <div className="navupper-container">
          <div className="navupper-inner-container nav-inner-width">
            <p>
              Call us now on{" "}
              <a className="text-phone-link">
                0333&nbsp;772&nbsp;6247 <Phone />
              </a>
            </p>
          </div>
        </div>
        <div className="nav-container">
          <div className="nav-inner-container nav-inner-width">
            <a href="/">
              <img src={logo} />
            </a>
            <MobNavButton
              handleChange={this.handleChange}
              currentState={this.state.mobileMenu}
            />
            <ul className="nav-links">
              {links.map((link) => (
                <a key={link.url} className={link.dropdownClass}>
                  {link.name}
                  {link.dropdownClass}
                </a>
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
