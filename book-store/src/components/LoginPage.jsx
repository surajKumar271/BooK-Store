import React, { useState } from "react";
import "./LoginPage.css";
import usersData from "../login.json";

const LoginPage = ({ setIsLoggedIn, setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = usersData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setIsLoggedIn(true);
      setCurrentUser(username);
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login to BookStore</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
