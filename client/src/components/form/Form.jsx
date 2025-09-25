import "./Form.css";

import { useState } from "react";

export default function Form() {
  const [formData, setFromData] = useState({
    gamename: "",
    name: "",
    review: "",
  });

  function handleInputChange(event) {
    setFromData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // This is where STEP 4 would go
    // Fetch POST server route
    // Add headers and body
    console.log(formData);
  }

  return (
    <>
      <h1>From</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>What game are you going to review?</legend>
          <label htmlFor="">Game name: </label>
          <input
            type="text"
            name="gamename"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="">name: </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset>
          <legend>Write out your review here</legend>
          <label htmlFor="">Review: </label>
          <input
            type="text"
            name="review"
            required
            value={formData.review}
            onChange={handleInputChange}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
