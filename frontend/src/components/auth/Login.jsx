import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const logoPath = "/image.png"; 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    
    e.preventDefault();
    try {
      setLoading(true);
      // specific login endpoint
      const res = await axios.post(`${process.env.BACKEND_URL}/auth`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login Failed! Please check your credentials.");
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
            Welcome back,<br />
            <span className="text-highlight">ready to ship?</span>
          </h1>
          <p className="brand-subtext">
            Continue where you left off. Monitor your deployments and collaborate with your team.
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
            <h2>Sign in to <span className="text-highlight font-bold  ">Hamara</span>Hub</h2>
            <p className="login-subtext">Enter your details to continue</p>
          </div>

          <form className="login-box" onSubmit={handleLogin}>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label className="label" htmlFor="Password">Password</label>
                <Link to="/forgot-password" style={{ fontSize: "12px", color: "#1f6feb", textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </div>
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="pass-box">
            <p>
              New to HamaraHub? <Link to="/signup" className="link-text">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;