import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SOAddItem.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../../firebase";
import axios from "axios";
import Swal from "sweetalert2";

function SOAddItem() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 2) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 1 image");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index, e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.itemName.trim() === "" ||
        formData.price.trim() === "" ||
        formData.description.trim() === "" ||
        files.length < 1
      ) {
        setError("All fields are required");
        return;
      }

      if (isNaN(formData.price)) {
        Swal.fire("Error!", "Price must be a valid number.", "error");
        return;
      }

      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const response = await axios.post("/api/item/createItem", {
        ...formData,
      });
      const data = response.data;
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      Swal.fire("Success!", "Your item has been added.", "success").then(() => {
        navigate("/shopowner-dashboard/items");
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="SOAddItem">
      <div className="topi">
        <h2>Add New Item</h2>
      </div>
      <form>
        <div className="form-section">
          <div className="in-sec">
            <label>Item Name :</label>
            <input
              type="text"
              placeholder="Item Name"
              id="itemName"
              required
              onChange={handleChange}
              value={formData.itemName}
            />
          </div>
          <div className="in-sec">
            <label>Price (LKR) :</label>
            <input
              type="text"
              placeholder="Item Price"
              id="price"
              required
              onChange={handleChange}
              value={formData.price}
            />
          </div>
          <div className="in-sec">
            <label>Description :</label>
            <input
              type="text"
              placeholder="Item Description"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div className="img-upld">
            <div className="file-sec">
              <input
                type="file"
                required
                onChange={(e) => setFiles(e.target.files)}
                id="images"
                accept="image/*"
              />
            </div>
            <div className="upld-btn">
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
          <p className="err-msg">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.map((imageUrl, index) => (
            <div className="img-view" key={index}>
              <div className="img-p">
                <img src={imageUrl} alt="" />
              </div>
              <div className="dlt-btn">
                <button
                  type="button"
                  onClick={(e) => handleRemoveImage(index, e)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
          <div className="upd-btnn">
            <button onClick={handleSubmit}>Add Item</button>
          </div>
          {error && <p className="err-msg">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default SOAddItem;
