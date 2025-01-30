import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import logo from "../../../images/pdflogo.png";

import "./ShopOwner.css";

const ShopOwner = () => {
    const [search, setSearch] = useState("");
  const [shopOwnerData, setShopOwnerData] = useState([]);
  const [filteredShopOwnerData, setFilteredShopOwnerData] = useState([]);

  //getAll Shop Onwers
  useEffect(() => {
    const getShopOwners = async () => {
      try {
        axios.get("/api/shopowner/getAllShopOwners").then((res) => {
          console.log(res.data.message);
          setShopOwnerData(res.data.allshopowners);
          setFilteredShopOwnerData(res.data.allshopowners);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getShopOwners();
  }, []);

  //searchFucntion
  useEffect(() => {
    const result = shopOwnerData.filter((filtershopOwner) => {
      return (
        filtershopOwner.shopownername.toLowerCase().match(search.toLowerCase()) ||
        filtershopOwner.storename.toLowerCase().match(search.toLowerCase()) ||
        filtershopOwner.email.toLowerCase().match(search.toLowerCase())
      );
    });

    setFilteredShopOwnerData(result);
  }, [search]);

  //PDF Generation
  const handlePDF = () => {
    const doc = new jsPDF();

    // Table headers
    const headers = [["NO", "SHOP OWNER NAME", "STORE NAME", "EMAIL", "MOBILE NUMBER"]];

    // Table data
    const data = filteredShopOwnerData.map((shopowner, index) => [
      index + 1,
      shopowner.shopownername,
      shopowner.storename,
      shopowner.email,
      shopowner.mobile,
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
      },
    });

    // doc.setFontSize(18);
    // doc.text("Metro Mall", 12, 18);
    doc.addImage(logo, "JPEG", 12, 20, 30, 30);

    doc.setFontSize(14);
    doc.text("SHOP OWNER LIST", 85, 65);
    doc.setFontSize(9);
    doc.text("Metro Mall", 155, 30);
    doc.text("No 590, Galle Road", 155, 35);
    doc.text("Colombo 03", 155, 40);
    doc.text("metromall@gmail.com", 155, 45);
    doc.text("011 2123 123", 155, 50);

    // Save PDF document
    doc.save("MM-ShopOwnerDescription.pdf");
  };



   //Delete Store
   const deleteShopOwner = async (id) => {
    if (window.confirm("Are you suer you want to delete ?")) {
      await axios
        .delete(`/api/shopowner/deleteShopOwner/${id}`)
        .then((res) => {
          alert("ShopOwner Deleted Successfully");
          // console.log("response : ",res.data);
          window.location.href = "/shopowner";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  return (
    <div className="shopowner">

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


      <table id="shopowner">
        <tr>
          <th>Shop Owner Name</th>
          <th>Store Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {filteredShopOwnerData.map((shopowner) => (
          <tr key={shopowner._id}>
            <td>{shopowner.shopownername}</td>
            <td>{shopowner.storename}</td>
            <td>{shopowner.email}</td>
            <td>{shopowner.mobile}</td>
            <td>
            <Link to={`/shopownerupdate/${shopowner._id}`}>
            <button className="EditButton">Edit</button>
          </Link>
            </td>
            <td>
            <button
            className="DeleteButton"
            onClick={() => deleteShopOwner(shopowner._id)}>
            Delete
          </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ShopOwner;
