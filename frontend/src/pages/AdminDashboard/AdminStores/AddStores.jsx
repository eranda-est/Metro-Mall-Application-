import React, { useState } from "react";
import axios from "axios";
import "./AddStores.css";
import {toast} from 'react-toastify';


const AddStores = () => {
  const [storeName, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [storeImage, setStoreImage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleFileChange = (e) => {
    setStoreImage(e.target.files[0]);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!storeName) {
      formIsValid = false;
      errors["storeName"] = "Please enter store name";
    }

    if (!location) {
      formIsValid = false;
      errors["location"] = "Please enter location";
    }

    if (!category || category === "Select Category") {
      formIsValid = false;
      errors["category"] = "Please select a category";
    }

    if (!description) {
      formIsValid = false;
      errors["description"] = "Please enter description";
    }

    if (!storeImage) {
      formIsValid = false;
      errors["storeImage"] = "Please select a store image";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const addStore = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("storeName", storeName);
      formData.append("location", location);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("storeImage", storeImage);

      const response = await axios.post("/api/store/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStoreName("");
      setLocation("");
      setCategory("");
      setDescription("");
      setStoreImage("");
      setFormErrors({}); 
      toast.success("Store added successfully 👌");

    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form className="addstoreform" encType="multipart/form-data">
      <div>
        <label className="addstorelable">Store Name:</label>
        <input
          className="storeinput"
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />
        <div className="error">{formErrors["storeName"]}</div>
      </div>
      <div>
        <label className="addstorelable">Location:</label>
        <input
          className="storeinput"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <div className="error">{formErrors["location"]}</div>
      </div>
      <div>
        <label className="addstorelable">Category:</label>
        <select
          className="storeinputselect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required>
          <option value="Select Category" disabled>
            Select Category
          </option>
          <option value="Food and Beverages">Food and Beverages</option>
          <option value="Fashion and Accessories">
            Fashion and Accessories
          </option>
          <option value="Beauty and Wellness">Beauty and Wellness</option>
        </select>
        <div className="error">{formErrors["category"]}</div>
      </div>
      <div>
        <label className="addstorelable">Description:</label>
        <textarea
          className="storeinputtextarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required></textarea>
        <div className="error">{formErrors["description"]}</div>
      </div>
      <div>
        <label className="addstorelable">Store Image:</label>
        <input
          className="storeinputfile"
          type="file"
          filename="storeImage"
          onChange={handleFileChange}
          required
        />
        <div className="error">{formErrors["storeImage"]}</div>
      </div>

      <button onClick={addStore} className="addstorebutton" type="submit">
        Create Store
      </button>
    </form>
  );
};

export default AddStores;
