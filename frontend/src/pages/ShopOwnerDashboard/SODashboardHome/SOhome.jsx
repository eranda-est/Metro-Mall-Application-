import React, { useState, useEffect } from "react";
import "./SOhome.css";
import Piechart from "./piechart/Piechart";
import TotalItems from "../../../assets/Images/sodashboard/totalItems.png";
import TotalPreOrders from "../../../assets/Images/sodashboard/totalPreorders.png";
import TotalCompleteOrders from "../../../assets/Images/sodashboard/totalCompleteorders.png";
import axios from "axios";

function SOhome() {
  const [itemCount, setItemCount] = useState(0);
  const [pendingCount, setpendingCount] = useState(0);
  const [completeCount, setcompleteCount] = useState(0);

  useEffect(() => {
    async function fetchItemCount() {
      try {
        const res = await axios.get("/api/item/getItemCount");
        const data = res.data.count;
        setItemCount(data);
      } catch (error) {
        console.error("Error fetching customer count: ", error);
      }
    }
    fetchItemCount();
  }, []);

  useEffect(() => {
    async function fetchpendingCount() {
      try {
        const res = await axios.get("/api/preOrder/pendingOrderCount");
        const data = res.data.count;
        setpendingCount(data);
      } catch (error) {
        console.error("Error fetching customer count: ", error);
      }
    }
    fetchpendingCount();
  }, []);

  useEffect(() => {
    async function fetchcompleteCount() {
      try {
        const res = await axios.get("/api/preOrder/completedOrderCount");
        const data = res.data.count;
        setcompleteCount(data);
      } catch (error) {
        console.error("Error fetching customer count: ", error);
      }
    }
    fetchcompleteCount();
  }, []);

  return (
    <div className="sohome">
      {/* first row */}
      <div className="first-row">
        <div className="first-card">
          <div className="firstcard-img">
            <img
              src={TotalItems}
              alt="first-card-image"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="first-card-details">
            <p>Total Items</p>
            <p>{itemCount}</p>
          </div>
        </div>
        <div className="second-card">
          <div className="secondcard-img">
            <img
              src={TotalPreOrders}
              alt="second-card-image"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="second-card-details">
            <p>Total Pending Orders</p>
            <p>{pendingCount}</p>
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
            <img
              src={TotalCompleteOrders}
              alt="third-card-image"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="third-card-details">
            <p>Total Complete Orders</p>
            <p>{completeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SOhome;
