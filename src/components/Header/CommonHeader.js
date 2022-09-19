import React, { Component } from "react";
import LogoImage from "../../assets/companylogo/cropped-VERAUT-LOGO.png";
import UKimg from "../../assets/flag/uk.png";
import GRimg from '../../assets/flag/gr.png'
import { Link } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import "./Header.css";
import {
  Badge,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

class CommonHeader extends Component {
  state = {
    user: "",
  };

  constructor(props) {
    super(props);
    // Menu items definition
    this.menuItems = [
      {
        text: "How it works?",
      },
      {
        items: [
          { text: "Menu 2.1", url: "/my_stable" },
          { text: "Menu 2.2", url: "/my_stable" },
        ],
        text: "Find talent",
      },
      {
        items: [
          { text: "Menu 3.1", url: "/my_stable" },
          { text: "Menu 3.2", url: "/my_stable" },
        ],
        text: "Find jobs",
      },
      { separator: true },
    ];

    if (this.props.isAuthenticated) {
      this.menuItems.push({
        items: [
          { text: "Profile", url: "/profile", iconCss: "fa-solid fa-user" },
          { text: "Logout", url: "#", iconCss: "fa-solid fa-user" },
        ],
        text: this.props?.user?.email,
        iconCss: "fa-solid fa-user",
      });
    } else {
      this.menuItems.push({ text: "Login", url: "/login" });
      this.menuItems.push({ text: "Join", url: "/register" });
    }
  }

  componentDidMount = () => {
    $("#main-menu>li>a").click(function () {
      $("#mySidenav").css("left", "-280px");
      document.getElementById("one").style.display = "";
      document.getElementById("two").style.display = "none";
    });

    $("#mySidenav").css("left", "-280px");
    document.getElementById("one").style.display = "";
    document.getElementById("two").style.display = "none";

    $(".a-toggle").click(function () {
      $(".social-m").slideToggle();
    });

    this.setState({ user: localStorage.getItem("user") });
  };

  openNav = () => {
    $("#mySidenav").css("left", "0");
    $("#mySidenav").css("width", "300px");
    document.getElementById("one").style.display = "none";
    document.getElementById("two").style.display = "";
  };

  closeNav = () => {
    $("#mySidenav").css("left", "-280px");
    document.getElementById("one").style.display = "";
    document.getElementById("two").style.display = "none";
  };

  render() {
    return (
      <React.Fragment>
        <section className="default-toggle">
          <div className="mobile_menu">
            <Link to="#" id="one" onClick={() => this.openNav()}>
              <i className="fa fa-bars" style={{ color: "white", padding: "10px" }}></i>
            </Link>
            <Link to="#" id="two" onClick={() => this.closeNav()}>
              <i className="fa fa-times"></i>
            </Link>
          </div>
          <div className="nav_menu_content">
            <div id="mySidenav" className="sidenav">
              <ul id="main-menu" className="sm sm-clean">
                  <>
                    <li>
                      <Link title="How it works?" to="/#">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link title="Build Your dream" to="/#">
                        Products
                      </Link>
                    </li>

                    <li>
                      <Link title="Contact" to="/#">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link title="Our Mission" to="/#">
                        Downloads
                      </Link>
                    </li>
                  </>
              </ul>
            </div>
          </div>
        </section>

        {/* React nav  */}
        <Navbar bg="light" expand="lg" className="w-100" fixed="top">
          <Container fluid>
            <Link className="navbar-brand" to="/">
              <img src={LogoImage} alt="logo" className="logoImage" />
            </Link>
            {process.env.NODE_ENV === 'production' ? <Badge
              className="ms-4 px-3 custom-badge"
              bg="warning"
            >
              Beta Version
              <span className="animate-flicker">
                (No Trading &amp; Communication)
              </span>
            </Badge> : <></>}
              <>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                    <NavLink
                      exact
                      activeClassName="active"
                      title="How it works?"
                      className="nav-link "
                      to="#"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="How it works?"
                      className="nav-link "
                      to="/#"
                    >
                      Products
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="Contact"
                      className="nav-link "
                      to="/#"
                    >
                      Contact
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title=" Our Mission"
                      className="nav-link "
                      to="/#"
                    >
                      Downloads
                    </NavLink>
                  </Nav>
                </Navbar.Collapse>
                <div className="authbutton">
                  <div className="form-inline my-2 my-lg-0 nav-btns">
                      <img src={UKimg} alt="uk"></img>
                  </div>
                  <div className="form-inline my-2 my-lg-0 nav-btns">
                      <img src={GRimg} alt='gr'></img>
                  </div>
                </div>
              </>

          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader);
