import { useState, useEffect } from "react";
import "./Item.css";
import axios from "axios";
import Swal from "sweetalert2";

function Item({ item }) {
  const handlePreOrder = async () => {
    // Show confirmation alert
    const result = await Swal.fire({
      title: "Confirm Pre-order",
      text: "Are you sure you want to pre-order this item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    // If user confirms
    if (result.isConfirmed) {
      try {
        const itemId = item._id;
        const response = await axios.post("/api/preOrder/addPreOrder", {
          itemId,
        });
        console.log(response.data);
        // Show success message using Swal
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Pre-order created successfully",
        });
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
          // If the item is already pre-ordered, display a message
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "This item is already pre-ordered by you",
          });
        } else {
          // If any other error occurs, display a generic error message
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to create pre-order",
          });
        }
      }
    }
  };

  return (
    <div className="item-page">
      <div className="item-card">
        <div className="item-img">
          <img
            src={item.imageUrls}
            alt="item-image"
            style={{ width: "260px", height: "auto" }}
          />
        </div>
        <div className="item-detail">
          <div className="item-text">
            <h3>{item.itemName}</h3>
            <p>{item.description}</p>
            <h5>RS {item.price}</h5>
          </div>
        </div>
        <div className="preorder-btn">
          <button onClick={handlePreOrder}>Pre Order Now</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
