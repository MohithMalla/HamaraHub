import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import "./auth.css";

const Signup = () => {
  // Assuming your white-text logo is named logo-dark.png or similar in public folder
  // Or you can import it if it's in assets
  const logoPath = "/image.png"; 

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/signup", {
        email, password, username,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT SIDE: Brand & Hero */}
      <div className="auth-brand-side">
        <div className="brand-content">
          <div className="brand-logo-container">
  {/* Option A: Using Inline Style */}
  <img 
    src={logoPath} 
    alt="HamaraHub Logo" 
    className="brand-logo-img" 
    style={{ height: "150px", width: "auto" }} 
  />
</div>
          <h1 className="brand-heading">
            Build faster,<br />
            <span className="text-highlight">deploy together.</span>
          </h1>
          <p className="brand-subtext">
            Join the community deployment platform where teams turn code into reality.
          </p>
        </div>
        {/* CSS Background Shape */}
        <div className="abstract-shape"></div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="auth-form-side">
        <div className="login-box-wrapper">
          
          {/* Mobile Logo */}
          <div className="mobile-logo">
             <img src={logoPath} alt="Logo" className="logo-login" />
          </div>

          <div className="login-header">
            <h2>Create your account</h2>
            <p className="login-subtext">Welcome to the community</p>
          </div>

          <form className="login-box" onSubmit={handleSignup}>
            <div className="input-group">
              <label className="label" htmlFor="Username">Username</label>
              <input
                autoComplete="off"
                name="Username"
                id="Username"
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="hamarahub_dev"
              />
            </div>

            <div className="input-group">
              <label className="label" htmlFor="Email">Email address</label>
              <input
                autoComplete="off"
                name="Email"
                id="Email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>

            <div className="input-group">
              <label className="label" htmlFor="Password">Password</label>
              <input
                autoComplete="off"
                name="Password"
                id="Password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button className="submit-btn" disabled={loading} type="submit">
              {loading ? "Creating Account..." : "Sign up"}
            </button>
          </form>

          <div className="pass-box">
            <p>
              Already have an account? <Link to="/auth" className="link-text">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;