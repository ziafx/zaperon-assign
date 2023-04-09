import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // handle response data hav e to add
    } catch (error) {
      // handle error have to add that
    }
  };

  return (
    <main className="login-page" main>
      <div className="main" />
      <div className="login" login />
      <img className="login-page-child" alt="" src="/ellipse-1.svg" />
      <img className="ic-user-1" alt="" src="/ic-user-1@2x.png" />
      <h2 className="welcome">Welcome!</h2>
      <p className="quote">
        Let's connect to your workspace. Please enter your email to continue.
      </p>
      <TextField
        className="login-page-item"
        sx={{ width: 500 }}
        color="primary"
        variant="outlined"
        type="email"
        name="ip"
        label="Email Address"
        placeholder="Email Address"
        size="medium"
        margin="none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="login-page-inner"
        sx={{ width: 500 }}
        color="primary"
        variant="outlined"
        type="text"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
                <Icon>visibility</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        name="Password"
        label="Password"
        placeholder="Password"
        size="medium"
        margin="none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="rectangle-button"
        sx={{ width: 500 }}
        variant="contained"
        name="Sign in"
        color="primary"
        size="large"
        onClick={handleSignIn}
      >
        Sign In
      </Button>
      <a className="forget-password" href="xyz.com" target="_blank">
        Forget Password?
      </a>
      <footer className="rectangle-footer" id="footer" footer />
      <a className="privacy-policy" href="xyz.com">
        {`Privacy Policy & Terms`}
      </a>
      <p className="powered-by">Powered By</p>
      <a className="needed-help" href="xyz.com">
        Needed Help?
      </a>
      <img className="logog-1-icon" alt="" src="/logog-1@2x.png" />
    </main>
  );
};

export default LoginPage;
