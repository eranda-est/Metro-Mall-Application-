import React, { useEffect, useState } from "react";
import "./SOPreorders.css";
import { Table, Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../../assets/Images/sodashboard/pdflogo.png";

function SOPreorders() {
  const [preOrders, setPreOrders] = useState([]);
  const [remainingTimes, setRemainingTimes] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);

  //fetch pre orders
  useEffect(() => {
    async function fetchpreOrders() {
      try {
        const response = await axios.get("/api/preOrder/getPendingPreOrders");
        setPreOrders(response.data);
        startTimers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchpreOrders();
  }, []);

  //get reamainig time
  const startTimers = (preOrders) => {
    const timers = {};
    preOrders.forEach((order) => {
      timers[order._id] = setInterval(() => {
        const addedTime = new Date(order.createdAt).getTime();
        const currentTime = new Date().getTime();
        const difference = 48 * 60 * 60 * 1000 - (currentTime - addedTime);

        if (difference <= 0) {
          clearInterval(timers[order._id]);
          setRemainingTimes((prevRemainingTimes) => ({
            ...prevRemainingTimes,
            [order._id]: "Expired",
          }));
        } else {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setRemainingTimes((prevRemainingTimes) => ({
            ...prevRemainingTimes,
            [order._id]: `${hours.toString().padStart(2, "0")} : ${minutes
              .toString()
              .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`,
          }));
        }
      }, 1000);
    });
  };

  //delete preorders
  const handleDelete = async (orderId) => {
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
            `/api/preOrder/deletePreOrder/${orderId}`
          );
          if (response.status === 200) {
            // Show success message using SwalFire
            Swal.fire(
              "Canceled!",
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

  //complete orders
  const handleComplete = async (orderId) => {
    // Show confirmation modal using SwalFire
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to mark this item as completed.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it as completed!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send PUT request to update status to "completed"
          const response = await axios.patch(
            `/api/preOrder/updateStatus/${orderId}`
          );
          if (response.status === 200) {
            // Show success message using SwalFire
            Swal.fire(
              "Completed!",
              "Your item has been marked as completed.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          }
        } catch (error) {
          console.error("Error updating status:", error);
          // Show error message using SwalFire
          Swal.fire("Error!", "Failed to mark item as completed.", "error");
        }
      }
    });
  };

  //search pre orders
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredItems = preOrders.filter((preOrder) => {
      return preOrder.item.itemName.toLowerCase().includes(searchQuery);
    });
    setFilteredItems(filteredItems);
  };

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : preOrders;

  //pdf function
  const pdfDownload = () => {
    const doc = new jsPDF();

    const headers = [["NO", "Item Name", "Price", "Status", "Remaining Time"]];

    //map the data into the table
    const data = preOrders.map((preOrder, index) => [
      index + 1,
      preOrder.item.itemName,
      preOrder.item.price,
      preOrder.status,
      remainingTimes[preOrder._id],
    ]);

    //add the table into pdf
    doc.autoTable({
      head: headers,
      body: data,
      startY: 70,
      styles: {
        halign: "center",
        valign: "middle",
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [3, 17, 68], // Background color for table headers
        textColor: [255, 255, 255], // Text color for table headers (optional)
        fontSize: 10,
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // Background color for table body (data)
        fontSize: 9,
      },
    });

    doc.addImage(logo, "JPEG", 12, 20, 30, 30);

    doc.setFontSize(14);
    doc.text("Item List", 85, 65);
    doc.setFontSize(9);
    doc.text("Metro Mall", 155, 30);
    doc.text("No 590, Galle Road", 155, 35);
    doc.text("Colombo 03", 155, 40);
    doc.text("metromall@gmail.com", 155, 45);
    doc.text("011 2123 123", 155, 50);

    //save the pdf with file name
    doc.save("preOrders.pdf");
  };

  const columns = [
    {
      title: "Item Name",
      dataIndex: ["item", "itemName"],
      key: "itemName",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: ["item", "price"],
      key: "itemName",
      align: "center",
    },
    {
      title: "Remaining Time",
      dataIndex: "remainingTime",
      key: "remainingTime",
      align: "center",
      render: (_, record) => remainingTimes[record._id],
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="tbl-btn">
          <Button
            className="complete-btn"
            onClick={() => handleComplete(record._id)}
          >
            Complete
          </Button>
          <Button
            className="delete-btn"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="SOPreorders">
      <div className="head-section">
        <div className="srch-export">
          <input
            type="text"
            placeholder="Search"
            name="searchQuery"
            onChange={handleSearch}
          />
          <button onClick={pdfDownload}>Export</button>
        </div>
      </div>
      {/* body */}
      <div className="body-sec">
        <Table
          columns={columns}
          dataSource={itemsToDisplay}
          pagination={{ pageSize: 5 }}
          footer={() => (
            <div className="footer-number">{`Total ${preOrders.length} items`}</div>
          )}
          rowKey={(record) => record._id}
        />
      </div>
    </div>
  );
}

export default SOPreorders;
