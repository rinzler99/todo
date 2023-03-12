import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    //   console.log(users);
    if (users) {
      if (email in users) {
        alert("User already exists!");
        return;
      }
      users[email] = { password: password, tasks: [] };
      // console.log(obj)
      localStorage.setItem("users", JSON.stringify(users));
      setConfirmPassword('');
      setEmail('');
      setPassword('');
      alert("User Registration Success!");
    } else {
      let obj = {};
      obj[email] = { password: password, tasks: [] };

      localStorage.setItem("users", JSON.stringify(obj));
      alert("User Registration Success!");
    }
    // Submit the form
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-8 grid grid-row-4 grid-flow-row gap-4"
    >
      <div>
        <TextField
          label="Username"
          type="text"
          required
          value={email}
          autocomplete="new-password"
          onChange={handleEmailChange}
        />
      </div>

      <div>
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        {/* Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} /> */}
        {/* <div> */}
        <TextField
          label="Re-enter Password"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {/* </div> */}
      </div>
      {/* <button type="submit">Register</button> */}
      <div>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </div>
    </form>
  );
}

export default Register;
