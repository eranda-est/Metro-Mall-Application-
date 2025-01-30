import { useEffect, useState } from "react";
import "./SOUpdate.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../../firebase";
import Swal from "sweetalert2";

function SOUpdate() {
  const { id } = useParams();
  const [itemName, setitemName] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [imageUrls, setimageUrls] = useState([]);

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + imageUrls.length < 2) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setimageUrls(imageUrls.concat(urls)); // Corrected line
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
    setimageUrls(imageUrls.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/item/getItem/${id}`);

        const itemData = result.data.item;
        setitemName(itemData.itemName);
        setprice(itemData.price);
        setdescription(itemData.description);
        setimageUrls(itemData.imageUrls);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const updatedata = async (e) => {
    e.preventDefault();

    if (!itemName || !price || !description || imageUrls.length === 0) {
      Swal.fire("Error!", "All fields are required.", "error");
      return;
    }

    if (isNaN(price)) {
      Swal.fire("Error!", "Price must be a valid number.", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update the item details.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axios.patch(`/api/item/updateItem/${id}`, {
            itemName,
            price,
            description,
            imageUrls,
          });

          if (result.data && result.data.message === "item updated") {
            Swal.fire("Updated!", "Your item has been updated.", "success");
            navigate("/shopowner-dashboard/items");
          } else {
            console.log("Unexpected API response:", result.data);
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
    });
  };

  return (
    <div className="SOUpdate">
      <div className="topi">
        <h2>Update Item Details</h2>
      </div>
      <div className="form-section">
        <div className="in-sec">
          <label>Item Name :</label>
          <input
            type="text"
            placeholder="Item Name"
            required
            value={itemName}
            onChange={(e) => setitemName(e.target.value)}
          />
        </div>
        <div className="in-sec">
          <label>Price (LKR) :</label>
          <input
            type="text"
            placeholder="Item Price"
            required
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div className="in-sec">
          <label>Description :</label>
          <input
            type="text"
            placeholder="Item Description"
            required
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div className="img-upld">
          <div className="file-sec">
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
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
        {imageUrls.map((imageUrl, index) => (
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
          <button type="submit" onClick={updatedata}>
            Update Item
          </button>
        </div>
        {error && <p className="err-msg">{error}</p>}
      </div>
    </div>
  );
}

export default SOUpdate;
