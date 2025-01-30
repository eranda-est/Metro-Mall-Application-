import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ShopOwnerUpdate.css";

const ShopOwnerUpdate = () => {
  const [shopownername, setShopOwnerName] = useState("");
  const [storename, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobileNumber] = useState("");

  const { id } = useParams();

  //For Data Retrieve
  useEffect(() => {
    const getShopOwnerById = async () => {
      try {
        await axios
          .get(`/api/shopowner/getOneShopOwner/${id}`)
          .then((res) => {
            setShopOwnerName(res.data.singleShopOwner.shopownername);
            setStoreName(res.data.singleShopOwner.storename);
            setEmail(res.data.singleShopOwner.email);
            setMobileNumber(res.data.singleShopOwner.mobile);
            console.log("Data Fetched 👌");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getShopOwnerById();
  }, [id]);

  //updateForm Function - for update data
  const updateForm = async (e) => {
    e.preventDefault();
    console.log("Id :", id);

    try {
      if (window.confirm("Are you suer ?")) {
        await axios.patch(`/api/shopowner/updateShopOwner/${id}`, {
          shopownername,
          storename,
          email,
          mobile,
        });
      }
      alert("Data is updated 🤩");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="updateshopownerform " onSubmit={updateForm}>
        <div>
          <label className="updateshopownerlable">Shop Owner Name:</label>
          <input
            className="updateshopownerinput"
            name="shopownername"
            value={shopownername}
            onChange={(e) => setShopOwnerName(e.target.value)}
          />
        </div>

        <div>
          <label className="updateshopownerlable">Store Name:</label>
          <input
            className="updateshopownerinput"
            name="storename"
            value={storename}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div>
          <label className="updateshopownerlable">Email:</label>
          <input
            className="updateshopownerinput"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="addstorelable">Mobile Number:</label>
          <input
            className="updateshopownerinput"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>

        <button className="updateshopownerbutton">Update</button>
      </form>
    </div>
  );
};

export default ShopOwnerUpdate;
