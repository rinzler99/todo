import "./App.css";
import "./index.css";
import { useState } from "react";
import TodoList from "./TodoList";
import Register from "./Register";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    console.log(storedUsers[username]);
    if (username in storedUsers) {
      if (storedUsers[username]["password"] === password) {
        setIsLoggedIn(true);
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
      } else {
        alert("Incorrect password!");
      }
    } else {
      alert("Incorrect username!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.setItem("loggedInUser", username);
    alert("Logged out!");
  };

  if (isLoggedIn) {
    return (
      <div className="App2">
        <h1 className="font-bold text-xl mb-2">Welcome, {username}!</h1>
        <Button
          variant="contained"
          onClick={handleLogout}
          endIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
        <TodoList />
      </div>
    );
  } else {
    return (
      <div className="App flex flex-col">
        <div>
          <h1 className="font-bold text-2xl">TODO Application</h1>
        </div>
        <div className="flex flex-row place-content-center">
          <div>
            <form
              onSubmit={handleLogin}
              className="m-8 grid grid-row-1 grid-flow-column gap-4"
            >
              <div>
                <TextField
                  label="Username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="hide">
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </div>
          <div>
            <Register />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
