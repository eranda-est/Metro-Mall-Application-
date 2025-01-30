import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import logo from "../../../images/pdflogo.png";

import "./customer.css";

const Customer = () => {
  const [search, setSearch] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [filteredCustomerData, setFilteredCustomerData] = useState([]);

  //getAllCustomer
  useEffect(() => {
    const getCustomers = async () => {
      try {
        axios.get("/api/user/getAllUsers").then((res) => {
          console.log(res.data.message);
          setCustomerData(res.data.allusers);
          setFilteredCustomerData(res.data.allusers);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getCustomers();
  }, []);

  //searchFucntion
  useEffect(() => {
    const result = customerData.filter((filtercustomer) => {
      return (
        filtercustomer.username.toLowerCase().match(search.toLowerCase()) ||
        filtercustomer.email.toLowerCase().match(search.toLowerCase())
      );
    });

    setFilteredCustomerData(result);
  }, [search]);

  //PDF Generation
  const handlePDF = () => {
    const doc = new jsPDF();

    // Table headers
    const headers = [["NO", "CUSTOMER NAME", "EMAIL", "MOBILE NUMBER"]];

    // Table data
    const data = filteredCustomerData.map((customer, index) => [
      index + 1,
      customer.username,
      customer.email,
      customer.mobile,
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
    doc.text("CUSTOMER LIST", 85, 65);
    doc.setFontSize(9);
    doc.text("Metro Mall", 155, 30);
    doc.text("No 590, Galle Road", 155, 35);
    doc.text("Colombo 03", 155, 40);
    doc.text("metromall@gmail.com", 155, 45);
    doc.text("011 2123 123", 155, 50);

    // Save PDF document
    doc.save("MM-CustomersDescription.pdf");
  };

  //Delete Store
  const deleteCustomer = async (id) => {
    if (window.confirm("Are you suer you want to delete ?")) {
      await axios
        .delete(`/api/user/deleteUser/${id}`)
        .then((res) => {
          alert("Customer Deleted Successfully");
          // console.log("response : ",res.data);
          window.location.href = "/customer";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="customer">
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
        }}
      ></input>

      <Link to="">
        <button
          className="button"
          style={{
            marginLeft: 1320,
            color: "#ffffff",
            backgroundColor: "#031144",
          }}
          onClick={handlePDF}
        >
          EXPORT
        </button>
      </Link>

      <table id="customer">
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>User Level</th>
          <th>Access</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {filteredCustomerData.map((customer) => (
          <tr key={customer._id}>
            <td>{customer.username}</td>
            <td>{customer.email}</td>
            <td>{customer.mobile}</td>
            <td>{customer.role}</td>
            <td>
              <button className="AccessButton">Access</button>
            </td>
            <td>
              <button className="EditButton">Edit</button>
            </td>
            <td>
              <button
                className="DeleteButton"
                onClick={() => deleteCustomer(customer._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Customer;
