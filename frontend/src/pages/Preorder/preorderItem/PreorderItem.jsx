import React, { useState, useEffect } from "react";
import "./PreorderItem.css";
import axios from "axios";
import Swal from "sweetalert2";

function PreorderItem({ preOrder }) {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getRemainingTime() {
    const addedTime = new Date(preOrder.createdAt).getTime();
    const currentTime = new Date().getTime();
    const difference = 48 * 60 * 60 * 1000 - (currentTime - addedTime);

    if (difference <= 0) {
      return "Expired";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  const handleDelete = async () => {
    // Show confirmation modal using SwalFire
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `/api/preOrder/deletePreOrder/${preOrder._id}`
          );
          if (response.status === 200) {
            // Show success message using SwalFire
            Swal.fire(
              "Canceled!",
              "Your item has been cenceled.",
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
    <div className="preorder-item">
      <div className="po-card">
        <div className="po-image">
          <img
            src={preOrder.item.imageUrls}
            alt="preorder-image"
            style={{ width: "310px", height: "auto", borderRadius: "5px" }}
          />
        </div>
        <div className="po-texts">
          <h2 className="item-name">{preOrder.item.itemName}</h2>
          <p className="item-d">Rs {preOrder.item.price}</p>
          <p className="item-d">10% Off</p>
        </div>
        <div className="third-section">
          <div className="remain-time">
            <h4>
              {typeof remainingTime === "string"
                ? remainingTime
                : `${remainingTime.hours
                    .toString()
                    .padStart(2, "0")} : ${remainingTime.minutes
                    .toString()
                    .padStart(2, "0")} : ${remainingTime.seconds
                    .toString()
                    .padStart(2, "0")}`}
            </h4>
          </div>
          <div className="po-cancelbtn">
            <button className="c-btn" onClick={handleDelete}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreorderItem;
