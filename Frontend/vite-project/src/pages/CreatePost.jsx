import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // hard guard against double click

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);

      const res = await axios.post(
        "http://localhost:3000/create-post",
        formData,
      );

      console.log(res);
      navigate("/feed");
    } catch (err) {

      console.error(err);

      alert("Error in creating post");

    } finally {
      
      setIsSubmitting(false);
    }
  };

  return (
    <section className="create-post">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <br />
        <input name="caption" placeholder="Write a caption..." required />
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
