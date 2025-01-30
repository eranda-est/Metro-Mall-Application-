// import bkbanner from "../../images/BurgerKingBanner.jpeg";
import "./FoodDescription.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FoodDescription = () => {
  const [storeName, setStoreName] = useState("");
  const [location, setLocaion] = useState("");
  const [description, setDescription] = useState("");
  const [storeImage, setStoreImage] = useState("");

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
            setDescription(res.data.singleStore.description);
            setStoreImage(res.data.singleStore.storeImage);
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

  return (
    <div>
      <div className="fooddescription">
        <div className="imageContainer">
          <img src={`/uploads/${storeImage}`} />
        </div>

        <div className="topiccontainer">
          <h1>{storeName}</h1>
          <button className="viewItembutton">View Item</button>
        </div>

        <div className="descriptionContainer">
          <LocationOnIcon style={{ height: 40, width: 40 }} />
          <h3 style={{fontWeight:600}}>{`${location}, METRO MALL, COLOMBO`}</h3>
        </div>
        <br />
        <p className="paragraphcontainer">{description}</p>
      </div>
    </div>
  );
};

export default FoodDescription;
