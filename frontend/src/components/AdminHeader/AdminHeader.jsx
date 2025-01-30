import React from "react";
import "./AdminHeader.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AdminHeader() {
  return (
    <div className="header">
      <div className="logo">
        <h1 className="headername">METRO MALL</h1>
      </div>
      <div>
        <AccountCircleIcon style={{ fontSize: 40, width: 40, height: 40 }} />
      </div>
    </div>
  );
}

export default AdminHeader;
