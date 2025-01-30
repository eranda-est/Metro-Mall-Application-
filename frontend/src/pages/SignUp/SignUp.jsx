import React, { useState } from "react";
import axios from "axios";
import welcome from "../../images/welcome.jpg";
import googleIcon from "../../images/googleicon.jpg";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
  const [username, setusername] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const createUser = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!username || !mobile || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required.",
      });
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(mobile)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Mobile number must contain exactly ten digits.",
      });
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Invalid email format.",
      });
      return;
    }

    try {
      const response = await axios.post("/api/user/create", {
        username,
        mobile,
        email,
        password,
      });
      console.log(response.data);
      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have successfully registered.",
      });
      // Clear input fields after successful registration
      setusername("");
      setmobile("");
      setemail("");
      setpassword("");

      navigate("/signin");
    } catch (error) {
      console.log("user create error", error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Failed to register. Please try again later.",
      });
    }
  };

  return (
    <div className="container">
      <form>
        <p className="signuppara">Sign Up</p>
        <label className="regInputs">
          <input
            className="userinput"
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            required
          />
        </label>
        <label className="regInputs">
          <input
            className="userinput"
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => {
              setmobile(e.target.value);
            }}
            required
          />
        </label>
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
        <button type="submit" className="signupbutton" onClick={createUser}>
          SIGN UP
        </button>
        <br />
        <button type="submit" className="googlesignupbutton">
          <img src={googleIcon} className="googleicon" alt="Google Icon" />
          Continue with Google
        </button>
        <p
          style={{
            fontFamily: "Calibri",
            fontSize: 18,
            marginTop: 10,
            marginLeft: 135,
            color: "blue",
          }}
        >
          Have an account?
          <Link to="/signin"> Sign In</Link>
        </p>
        <div className="sideImageSignUp">
          <img src={welcome} className="welcome" alt="Welcome" />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
