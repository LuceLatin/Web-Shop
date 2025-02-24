import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("/register", userData);

      if (response.status === 201) {
        console.log("User registered successfully");
      } else if (response.status === 422) {
        console.error(
          "User already exists with that email, email and password is required"
        );
      }
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="container-css">
      <h2>Register</h2>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button className="button-css" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
