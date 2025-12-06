import React, { useState } from "react"; // import React and useState hook
import axios from "axios";               // import axios for HTTP requests
import "./LoginPage.css";  

const LoginPage = ({ setIsLoggedIn, setCurrentUser, switchToRegister }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/auth/login`, {
        identifier: identifier.trim(), // trim whitespace
        password,
      });
      localStorage.setItem("token", res.data.token);
      setCurrentUser(res.data.user);
      setIsLoggedIn(true);
      setMsg("Login successful!");
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login to BookStore</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        {switchToRegister && (
          <p>
            Don't have an account?{" "}
            <button type="button" onClick={switchToRegister}>
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
export default LoginPage;
