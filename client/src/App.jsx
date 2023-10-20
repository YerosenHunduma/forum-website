import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserContext } from "./Context/Context";
import axios from "axios";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [userData, setuserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    //check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        //if token exists in localStorage then use auth to verify token and get user info
        const userRes = await axios.get(
          "http://localhost:5555/api/users/check",
          {
            headers: { authorization: token },
          }
        );

        //set the global state with user info
        setuserData({
          token,
          user: {
            username: userRes.data.user.username,
            userid: userRes.data.user.userid,
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setuserData({ token: undefined, user: undefined });
      }
    }
  };

  const logout = () => {
    //set global state to undefined will logout the user
    setuserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Header logout={logout} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home logout={logout} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
