import React from "react";
import "./ClientHeader.css";
import clientLogo from "../../images/MetroMallLogo.jpg";

function ClientHeader() {
  return (
    <div class="clientheader">
      <div className="clientheader-left">
        <img
          src={clientLogo}
          style={{ width: 240, height: 130, marginLeft: 90 }}
        />
      </div>
      <div class="clientheader-right">
        <a class="active" href="http://localhost:5173/home">
          Home
        </a>
        <a href="http://localhost:5173/foodbeverages">Store Directories</a>
        <a href="http://localhost:5173/about">About Us</a>
        <div class="clientdropdown">
          <button class="clientdropbtn">
            Services
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="clientdropdown-content">
            <a href="http://localhost:5173/parking" style={{ fontSize: 18 }}>
              PARKING
            </a>
            <a href="http://localhost:5173/contactus" style={{ fontSize: 16 }}>
              CONTACT US
            </a>
          </div>
        </div>
      </div>
      <div>
        <button
          className="ClientsigninBtn"
          style={{
            width: 130,
            height: 50,
            marginRight: 10,
            marginLeft: 40,
            fontFamily: "calibri",
            fontSize: 21,
            fontWeight: 900,
            backgroundColor: "#d9d9d944",
            color: "white",
            borderRadius: 5,
            border: "none",
            cursor:"pointer"
          }}>
          SIGN IN
        </button>
        <button
          style={{
            width: 130,
            height: 50,
            marginRight: 20,
            marginLeft: 10,
            fontFamily: "calibri",
            fontSize: 21,
            fontWeight: 900,
            backgroundColor: "#d9d9d9",
            color: "#031144",
            borderRadius: 5,
            border: "none",
            cursor:"pointer"
          }}>
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default ClientHeader;