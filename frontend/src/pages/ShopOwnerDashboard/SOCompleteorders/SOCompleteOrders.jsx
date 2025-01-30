import React, { useEffect, useState } from "react";
import "./SOCompleteOrders.css";
import { Table, Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../assets/Images/sodashboard/pdflogo.png";

function SOCompleteOrders() {
  const [preOrders, setPreOrders] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  //fetch complete pre orders
  useEffect(() => {
    async function fetchpreOrders() {
      try {
        const response = await axios.get("/api/preOrder/getCompletedPreOrders");
        setPreOrders(response.data);
        startTimers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchpreOrders();
  }, []);

    //pdf function
    const pdfDownload = () => {
      const doc = new jsPDF();
  
      const headers = [["NO", "Item Name", "Price", "Status"]];
  
      //map the data into the table
      const data = preOrders.map((preOrder, index) => [
        index + 1,
        preOrder.item.itemName,
        preOrder.item.price,
        preOrder.status,
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

  //search pre orders
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredItems = preOrders.filter((preOrder) => {
      return preOrder.item.itemName.toLowerCase().includes(searchQuery);
    });
    setFilteredItems(filteredItems);
  };

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : preOrders;

  const columns = [
    {
      title: "Item Name",
      dataIndex: ["item", "itemName"],
      key: "itemName",
      align: "center",
    },
    {
      title: "Item Name",
      dataIndex: ["item", "price"],
      key: "itemName",
      align: "center",
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "itemName",
      align: "center",
    },
  ];

  return (
    <div className="SOCompleteOrders">
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
        />
      </div>
    </div>
  );
}

export default SOCompleteOrders;
