import React from "react";
import "./DashboardHome.css";
import Piechart from "./Piechart/Piechart";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";

const DashboardHome = () => {
  return (
    <div className="adhome">
    
      {/* first row */}
      <div className="first-row">
        <div className="first-card">
          <div className="firstcard-img">
            <GroupsIcon
              style={{ width: 100, height: 100, marginLeft: 40, marginTop: 20 }}
            />
          </div>
          <div className="first-card-details">
            <p style={{ fontFamily: "calibri", fontSize: 30 }}>
              Total Customers
            </p>
            <p style={{ fontFamily: "calibri", fontSize: 28 }}>10</p>
          </div>
        </div>

        <div className="second-card">
          <div className="secondcard-img">
            <GroupsIcon
              style={{ width: 100, height: 100, marginLeft: 25, marginTop: 20 }}
            />
          </div>
          <div className="second-card-details">
            <p style={{ fontFamily: "calibri", fontSize: 30 }}>
              Total Shop Owners
            </p>
            <p style={{ fontFamily: "calibri", fontSize: 28 }}>10</p>
          </div>
        </div>
      </div>

      {/* second row */}
      <div className="second-row">
        <div className="pichart">
          <Piechart />
        </div>

        <div className="third-card">
          <div className="thirdcard-img">
            <StoreIcon
              style={{ width: 100, height: 100, marginLeft: 40, marginTop: 20 }}
            />
          </div>
          <div className="third-card-details">
            <p style={{ fontFamily: "calibri", fontSize: 30 }}>Total Stores</p>
            <p style={{ fontFamily: "calibri", fontSize: 28 }}>12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
