// ForgotPasswordPage.js
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: You can later implement sending email with Parse here
    setSubmitted(true);
  };
  //return <h1>This is the Forgot Password page</h1>;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Reset Your Password</h2>
      {submitted ? (
        <p>Please check your email for further instructions.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <br />
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
  
};

export default ForgotPassword;
