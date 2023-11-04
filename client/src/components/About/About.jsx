import React from "react";
import "./About.css";
function About() {
  return (
    <div className="container py-5  justify-content-between login_container col-12 col-md-6 ms-md-2  mt-sm-5">
      <p className="forTitle">About</p>
      <h1>Evangadi Networks</h1>
      <p>
        No matter what stage of life you are in,whether you’re just starting
        elementary school or being promoted to CEO of a Fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps.
      </p>
      <br />
      <p>
        Wheather you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      <button className="btn2">HOW IT WORKS</button>
    </div>
  );
}

export default About;
