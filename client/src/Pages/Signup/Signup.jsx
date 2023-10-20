import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const [userData, setuserData] = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("http://localhost:5555/api/users/register", form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        "http://localhost:5555/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setuserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name: </label>
        <input type="text" name="firstname" onChange={handleChange} />
        <br />
        <label>Last Name: </label>
        <input type="text" name="lastname" onChange={handleChange} />
        <br />
        <label>User Name: </label>
        <input type="text" name="username" onChange={handleChange} />
        <br />
        <label>Email: </label>
        <input type="text" name="email" onChange={handleChange} />
        <br />
        <label>Password: </label>
        <input type="password" name="password" onChange={handleChange} />
        <br />
        <button>submit</button>
      </form>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}

export default Signup;
