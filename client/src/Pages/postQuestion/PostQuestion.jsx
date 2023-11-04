import { useContext, useState } from "react";
import "./postQuestion.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";
import axios from "../../axios";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaHandPointRight } from "react-icons/fa";

function PostQuestion() {
  const [userData, setuserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/questions/ask",
        {
          title: form.question,
          tag: form.tag,
          description: form.questionDescription,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex flex-column my-5">
        <h3>Steps to write a good question</h3>
        <ul className="question_steps">
          <li>
            <BsArrowRightCircleFill className="l" /> Summerize your problem in a
            one-line title.
          </li>
          <li>
            <BsArrowRightCircleFill className="l" /> Describe your problem in
            more detail.
          </li>
          <li>
            <BsArrowRightCircleFill className="l" /> Describe what you tried and
            what you expected to happen.
          </li>
          <li>
            <BsArrowRightCircleFill className="l" /> Review your question and
            post it to the site.
          </li>
        </ul>
      </div>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-5 question_form  justify-content-between"
      >
        <h3>Post your question</h3>
        <Link
          to="/"
          className="text-decoration-none text-reset cursor-pointer mb-3"
        >
          <FaHandPointRight /> Go to back Home page
        </Link>
        <input
          className="question_title"
          type="text"
          name="question"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          className="question_title"
          type="text"
          name="tag"
          placeholder="Tag"
          onChange={handleChange}
        />
        <textarea
          className="question_input"
          placeholder="Question Description..."
          name="questionDescription"
          onChange={handleChange}
        ></textarea>
        <button className="question_post_btn" type="Submit">
          Post Question
        </button>
      </form>
    </div>
  );
}

export default PostQuestion;
