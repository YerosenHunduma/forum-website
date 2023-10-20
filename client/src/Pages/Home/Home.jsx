import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

function Home({ logout }) {
  const [userData, setuserData] = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);
  return (
    <>
      <h1>WelCome {userData.user?.username}</h1>
      <button onClick={logout}>Log out</button>
    </>
  );
}

export default Home;
