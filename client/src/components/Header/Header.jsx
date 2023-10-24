import "./Header.css";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/Context";
import logo from "../../resource/Images/evangadi-logo-home.png";

import { Link, useNavigate } from "react-router-dom";

function Header({ logout }) {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const Signin = (e) => {
    e.preventDefault();
    if (userData.user) {
      logout();
    }
    navigate("/login");
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div className="header container-fluid">
        <div className="header-container container d-flex justify-content-between ">
          <Link to="/" className="header__image">
            <img src={logo} alt="logo" />
          </Link>
          <button className="icon d-sm-block d-md-none" onClick={toggleMenu}>
            ☰
          </button>
          <div className="d-flex  right-container justify-content-between d-none d-md-block">
            <Link to="/">Home</Link>
            <Link to="/">How it Works</Link>
            <button className="btn_header" onClick={Signin}>
              {userData.user ? "LogOut" : "SIGN IN"}
            </button>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="menu-container container-fluid py-4 d-md-none animation">
          <div className="hiddenMenu-container d-flex flex-column d-sm-block d-md-none">
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/">How it Works</Link>
            </div>
            <div>
              <button className="btn_header" onClick={Signin}>
                {userData.user ? "LogOut" : "SIGN IN"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
