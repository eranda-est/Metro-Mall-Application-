import React, { useEffect, useState } from "react";
import "./SOItem.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function SOItem({ item }) {
  const handleDelete = async () => {
    // Show confirmation modal using SwalFire
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `/api/item/deleteItem/${item._id}`
          );
          if (response.status === 200) {
            // Show success message using SwalFire
            Swal.fire(
              "Deleted!",
              "Your item has been deleted.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    });
  };

  return (
    <div className="SOItem">
      <div className="item-card">
        <div className="item-details">
          <p>{item.itemName}</p>
          <p>Rs {item.price}</p>
        </div>
        <div className="item-btns">
          <Link
            to={`/admindashboard/shopowner-dashboard/update-items/${item._id}`}
            className="upd-btn"
          >
            UPDATE
          </Link>
          <button onClick={handleDelete} className="dlt-btn">
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default SOItem;
