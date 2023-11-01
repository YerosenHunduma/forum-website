import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserContext } from "./Context/Context";
import axios from "axios";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import PostQuestion from "./Pages/postQuestion/PostQuestion";
import QuestionDetail from "./Pages/QuestionDetial/QuestionDetial";
import NoteFound from "./Pages/NotFound/NoteFound";

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
        const userRes = await axios.get(
          "http://localhost:5555/api/users/check",
          {
            headers: { authorization: token },
          }
        );

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoteFound />} />
          {userData.token ? (
            <>
              <Route path="/" element={<Home logout={logout} />} />
              <Route path="/ask" element={<PostQuestion />} />
              <Route
                path="/questions/:id"
                element={<QuestionDetail userData={userData} />}
              />
            </>
          ) : null}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
