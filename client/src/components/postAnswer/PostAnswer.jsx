import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./postAnswer.css";

function PostAnswer({ questionId }) {
  const params = useParams();
  const [form, setForm] = useState({});

  const token = localStorage.getItem("auth-token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5555/api/answers/${params.id}`,
        {
          questionid: questionId,
          answer: form.answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container my-5">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-5 answer_form justify-content-between"
      >
        <h3 className="">Answer The Top Question</h3>
        <Link to="/" className="text-decoration-none text-reset cursor-pointer">
          Go to Question page
        </Link>
        <textarea
          onChange={handleChange}
          className="answer_input"
          placeholder="Your Answer..."
          name="answer"
          id=""
        ></textarea>
        <button className="answer_post_btn" type="submit">
          Post Your Answer
        </button>
      </form>
    </div>
  );
}

export default PostAnswer;
