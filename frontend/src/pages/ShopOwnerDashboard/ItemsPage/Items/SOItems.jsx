import React, { useEffect, useState } from "react";
import "./SOItems.css";
import SOItem from "../Item/SOItem";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../../assets/Images/sodashboard/pdflogo.png";

function SOItems() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("/api/item/getAllItems");
        setItems(response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItems();
  }, []);

  //pdf function
  const pdfDownload = () => {
    const doc = new jsPDF();

    const headers = [["NO", "Item Name", "Price", "Description"]];

    //map the data into the table
    const data = items.map((item, index) => [
      index + 1,
      item.itemName,
      item.price,
      item.description,
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
    doc.save("item.pdf");
  };

  //search function
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredItems = items.filter((item) => {
      return item.itemName.toLowerCase().includes(searchQuery);
    });
    setFilteredItems(filteredItems);
  };

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : items;

  return (
    <div className="SOItems">
      <div className="head-section">
        <div className="add-btn">
          <Link to="/admindashboard/shopowner-dashboard/add-items">Add Items</Link>
        </div>
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
      {/* body section */}
      <div className="body-sec">
        {itemsToDisplay.map((item) => (
          <SOItem item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default SOItems;
