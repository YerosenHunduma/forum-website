import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";
import axios from "axios";
import About from "../About/About";
import './Signup.css'

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function Signup() {
  const [form, setForm] = useState({});
  const [type, setType] = useState("password");
  const [err, setError] = useState('')
  const navigate = useNavigate();

  const [userData, setuserData] = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/api/users/register", form);
      const loginRes = await axios.post(
        "http://localhost:5555/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      setuserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);

      navigate("/");
    } catch (error) {
    setError(error.response.data.msg);
    }
  }

  const [icon, setIcon] = useState(eyeOff);

  const HandleIconChange = () => {

    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  }

  return (
    <div className="container-fluid sign_page">
      <div className="container p-5 d-md-flex justify-content-between signup_container">
        <div className="form_wrapper col-12 col-md-6 me-md-2 p-5">
        <div className="animation d-flex flex-column justify-content-center">
          <p className="p11">Join the network</p>
          <p className="p22 lorem">
            Already have an account?
            <Link to="/login" className="a11">
              Sign in
            </Link>
          </p>
          <p className="errMsg">{err}</p>
          <form onSubmit={handleSubmit} >
            <input
              className="in11 mr-1"
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
            />
            <div className="FLname d-flex">
              <input
                className="in11 me-1"
                name="firstname"
                onChange={handleChange}
                type="text"
                placeholder="First Name"
              />
              <input
                className="in11 ms-1"
                name="lastname"
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              className="in11"
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="User Name"
            />
            <input
              className="in11"
              onChange={handleChange}
              name="password"
              type={type}
              placeholder="Password"
            />
            <span className="showHide">
              <Icon icon={icon} size={20} onClick={HandleIconChange} />
            </span>
            <button className="btnSign">Agree and Join</button>
          </form>
          <p className="mt-md-5 mt-sm-5 text-center texttag">
            I agree to the
            <Link to="" className="a22">
              privacy policy
            </Link>
            and
            <Link to="" className="a22">
              terms of service.
            </Link>
          </p>
          <Link to="/login" className="a33 text-center">
            Already have an account?
          </Link>
          </div>
        </div>
        <About/>
      </div>
    </div>
  );
}

export default Signup;
