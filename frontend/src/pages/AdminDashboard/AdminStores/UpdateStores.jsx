import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify';

import "./UpdateStores.css";

const UpdateStores = () => {
  const [storeName, setStoreName] = useState("");
  const [location, setLocaion] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  //For Data Retrieve
  useEffect(() => {
    const getStoreById = async () => {
      try {
        await axios
          .get(`/api/store/getOneStore/${id}`)
          .then((res) => {
            setStoreName(res.data.singleStore.storeName);
            setLocaion(res.data.singleStore.location);
            setCategory(res.data.singleStore.category);
            setDescription(res.data.singleStore.description);
            console.log("Data Fetched 👌");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getStoreById();
  }, [id]);

  //updateForm Function - for update data
  const updateForm = async (e) => {
    e.preventDefault();
    console.log("Id :", id);

    try {
      if (window.confirm("Are you suer ?")) {
        await axios.patch(`/api/store/updateStore/${id}`, {
          storeName,
          location,
          category,
          description,
        });
      }
      toast.success("Store is updated 🤩");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="updatestoreform " onSubmit={updateForm}>

        <div>
          <label className="updatestorelable">Store Name:</label>
          <input
            className="updatestoreinput"
            name="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div>
          <label className="updatestorelable">Location:</label>
          <input
            className="updatestoreinput"
            name="location"
            value={location}
            onChange={(e) => setLocaion(e.target.value)}
          />
        </div>

        <div>
          <label className="updatestorelable">Category:</label>
          <select
            className="updatestoreinputselect"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="Select Category" disabled>
              Select Category
            </option>
            <option value="Food and Beverages">Food and Beverages</option>
            <option value="Fashion and Accessories">
              Fashion and Accessories
            </option>
            <option value="Beauty and Wellness">Beauty and Wellness</option>
          </select>
        </div>

        <div>
          <label className="addstorelable">Description:</label>
          <textarea
            className="updatestoreinputtextarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <button className="updatestorebutton">Update</button>
        
      </form>
    </div>
  );
};

export default UpdateStores;
