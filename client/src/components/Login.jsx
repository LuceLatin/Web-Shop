import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", credentials);
      const { token } = response.data;
      localStorage.setItem("jwt", token);
      console.log("Korisnik uspješno prijavljen");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Greška prilikom prijave:", error.message);
    }
  };

  return (
    <div className="container-css">
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button className="button-css" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
