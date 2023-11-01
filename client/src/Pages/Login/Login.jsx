import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import About from "../About/About";
import "./Login.css";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function Login() {
  const [userData, setuserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [type, setType] = useState("password");
  // to change type attribute from 'password' to 'text' and vice versa
  const [icon, setIcon] = useState(eyeOff);
  const [err, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending user data to the database to be logged in
      const loginRes = await axios.post(
        "http://localhost:5555/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // Update global state with response from the backend (user-info)
      setuserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      // Set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      // Navigate the user to the homepage
      navigate("/");
    } catch (err) {
      console.log("Problem", err.response.data.msg);
      setError(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) {
      navigate("/");
    }
  }, [userData.user, navigate]);

  const HandleIconChange = () => {
    // event listenforPassworder function
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <>
      <div className="container-fluid login_page">
      <div className="container py-5 d-md-flex justify-content-between login_container">
        <div className="main col-12 col-md-6 me-md-2 p-5 ">
          <div className="animation d-flex flex-column justify-content-center">
            <p className="p1">Login to your account</p>
            <p className="p2 text-center">
              Don't have an account?
              <Link to="/signup" className="a3">
                Create a new account
              </Link>
            </p>
            <p className="errMsg">{err}</p>
            <form onSubmit={handleSubmit}>
              <input
                className="in1"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Your Email"
              />
              <input
                className="in1"
                type={type}
                name="password"
                onChange={handleChange}
                placeholder="Your Password"
              />
              <span onClick={HandleIconChange} className="showHide2">
                <Icon icon={icon} size={20} />
              </span>
              <button className="btn1">Login</button>
            </form>
            <Link to="/signup" className="a3 a1">
              Create an account?
            </Link>
            </div>
          </div>
          <About/>
        </div>
      </div>
    </>
  );
}

export default Login;
