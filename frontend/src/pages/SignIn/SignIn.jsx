import React, { useState } from "react";
import axios from "axios";
import welcome from "../../images/pexels-gustavo-fring-6050395.jpg";
import googleIcon from "../../images/googleicon.jpg";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter email and password.",
      });
      return;
    }

    try {
      const { data, status } = await axios.post("/api/user/login", {
        email,
        password,
      });

      if (status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        // Display success message using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          confirmButtonText: "Continue",
        });
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid Credentials.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Credentials.",
      });
      console.log(error);
    }
  }

  return (
    <div className="container">
      <form>
        <p className="signinpara">Sign In</p>

        <label className="regInputs">
          <input
            className="userinput"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          />
        </label>

        <label className="regInputs">
          <input
            className="userinput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <br />
        <br />
        <br />
        <br />
        <button type="submit" className="signinbutton" onClick={handleLogin}>
          SIGN IN
        </button>
        <br />
        <button type="submit" className="googlesigninbutton">
          <img src={googleIcon} className="googleicon" alt="Google Icon" />
          Continue with Google
        </button>
        <p
          style={{
            fontFamily: "Calibri",
            fontSize: 18,
            marginTop: 10,
            marginLeft: 100,
            color: "blue",
          }}
        >
          You don't have an account?
          <Link to="/signup">Sign In</Link>
        </p>
        <div className="sideImage">
          <img src={welcome} className="welcome" />
        </div>
      </form>
    </div>
  );
}

export default SignIn;
