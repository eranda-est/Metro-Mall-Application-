import React from "react";
import "./ClientFooter.css";
import metroicon from "../../images/metroicon.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const ClientFooter = () => {
  return (
    <div className="Clientfooter">
      <div className="Clientbottom1">
        <b>WE ARE OPEN</b> <br />
        10:00AM - 09:00PM
      </div>
      <div className="Clientbottom2">
        <b>SERVICES</b>
        <br />
        Parking Services
        <br />
        Health Services
        <br />
        Safety and Security
      </div>
      <div className="Clientbottom3">
        <b>GET SOCIAL WITH US</b>
        <div className="Clientbottom3Icon">
          <div>
            <FacebookIcon style={{ marginRight: 20, width: 40, height: 40 }} />
          </div>
          <div>
            <InstagramIcon style={{ marginRight: 20, width: 40, height: 40 }} />
          </div>
          <div>
            <XIcon style={{ marginRight: 20, width: 40, height: 40 }} />
          </div>
        </div>
      </div>
      <div className="Clientbottom4">
        <img
          src={metroicon}
          style={{ width: 120, height: 100, borderRadius: 10 }}
        />
      </div>
      <div className="Clientbottom5">
        <b>CONTACT US</b>
        <br />
        Adress: No.590, Galle Road, Colombo 03 <br />
        Phone: (+94) 11 2 123-123 <br />
        Email: premises@metromall.com
      </div>
    </div>
  );
};

export default ClientFooter;
