import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./Context/Context";

import axios from "./axios";
import { v4 as uuid } from "uuid";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./route/index";
import { AuthenticatedRoute } from "./auth/ProtectedRoutes";

function App() {
  const [userData, setuserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    // Check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      // Token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        // If the token exists in localStorage, use auth to verify token and get user info
        const userRes = await axios.get("/users/check", {
          headers: { authorization: token },
        });

        // Set the global state with user info
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
    // Set the global state to undefined to log out the user
    setuserData({
      token: undefined,
      user: undefined,
    });

    // Resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    // Check if the user is logged in
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Header logout={logout} />
        <Routes>
          {routes.map((route) => (
            <React.Fragment key={uuid()}>
              {route.isAuthenticated ? (
                <Route
                  element={
                    <AuthenticatedRoute>{route.element}</AuthenticatedRoute>
                  }
                  path={route.path}
                />
              ) : (
                <Route element={route.element} path={route.path} />
              )}
            </React.Fragment>
          ))}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
