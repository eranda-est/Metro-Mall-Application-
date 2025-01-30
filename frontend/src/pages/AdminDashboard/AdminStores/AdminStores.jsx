import React, { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

import "./AdminStores.css";
import logo from "../../../images/pdflogo.png";

const stores = () => {
  const [search, setSearch] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [filteredStoreData, setFilteredStoreData] = useState([]);

  //getAllStores
  useEffect(() => {
    const getStores = async () => {
      try {
        axios.get("/api/store/getAllStores").then((res) => {
          console.log(res.data.message);
          setStoreData(res.data.allstores);
          setFilteredStoreData(res.data.allstores);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getStores();
  }, []);

  //searchFucntion
  useEffect(() => {
    const result = storeData.filter((filterstore) => {
      return (
        filterstore.storeName.toLowerCase().match(search.toLowerCase()) ||
        filterstore.location.toLowerCase().match(search.toLowerCase()) ||
        filterstore.category.toLowerCase().match(search.toLowerCase())
      );
    });

    setFilteredStoreData(result);
  }, [search]);

  //Delete Store
  const deleteStore = async (id) => {
    if (window.confirm("Are you suer you want to delete ?")) {
      await axios
        .delete(`/api/store/deleteStore/${id}`)
        .then((res) => {
          alert("Store Deleted Successfully");
          // console.log("response : ",res.data);
          window.location.href = "/admindashboard/stores";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //PDF Generation
  const handlePDF = () => {
    const doc = new jsPDF();

    // Table headers
    const headers = [["NO" ,"STORE NAME", "LOCATION", "CATEGORY"]];

    // Table data
    const data = filteredStoreData.map((store, index) => [
      index + 1,
      store.storeName,
      store.location,
      store.category
    ]);

    // Add table to PDF document
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
      }
    });

    // doc.setFontSize(18);
    // doc.text("Metro Mall", 12, 18);
    doc.addImage(logo, "JPEG", 12, 20, 30, 30);

    doc.setFontSize(14);
    doc.text("STORE LIST", 85, 65);
    doc.setFontSize(9);
    doc.text("Metro Mall", 155, 30);
    doc.text("No 590, Galle Road", 155, 35);
    doc.text("Colombo 03", 155, 40);
    doc.text("metromall@gmail.com", 155, 45);
    doc.text("011 2123 123", 155, 50);

    // Save PDF document
    doc.save("MM-StoresDescription.pdf");
  };

  return (
    <div className="store">
      <Link to="/admindashboard/stores/add">
        <button className="button">ADD STORE</button>
      </Link>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        style={{
          fontFamily: "calibri",
          fontSize: 22,
          padding: 10,
          marginTop: 80,
          marginLeft: 1030,
          width: 330,
          height: 50,
          borderRadius: 5,
          borderColor: "#D9D9D9",
          backgroundColor: "#D9D9D9",
        }}></input>

      <Link to="">
        <button
          className="button"
          style={{
            marginLeft: 1320,
            color: "#ffffff",
            backgroundColor: "#031144",
          }}
          onClick={handlePDF}>
          EXPORT
        </button>
      </Link>

      <table id="store">
        <tr>
          <th>Store Name</th>
          <th>Location</th>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {filteredStoreData.map((store) => (
          <tr key={store._id}>
            <td>{store.storeName}</td>
            <td>{store.location}</td>
            <td>{store.category}</td>
            <td>
              <Link to={`/admindashboard/stores/update/${store._id}`}>
                <button className="EditButton">Edit</button>
              </Link>
            </td>
            <td>
              <button
                className="DeleteButton"
                onClick={() => deleteStore(store._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default stores;
