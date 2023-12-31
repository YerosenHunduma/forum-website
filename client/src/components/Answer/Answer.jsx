import React from "react";
// import profile from "../../resource/Images/User.png";
import { BiUserCircle } from "react-icons/bi";

const Answer = ({ answer, username }) => {
  return (
    <div>
      <hr />
      <div className="di d-md-flex align-items-center justify-space-between">
        <div className="d-flex flex-md-column">
          <BiUserCircle className="user" />
          <h6 className="align-self-center ms-2 ms-md-0">{username}</h6>
        </div>
        <div className="ms-md-5">
          <h6 className="pt-2 pt-md-0">{answer}</h6>
        </div>
      </div>
    </div>
  );
};

export default Answer;
