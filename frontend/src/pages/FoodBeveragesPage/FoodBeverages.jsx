import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./FoodBeverages.css";

const FoodBeverages = () => {
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

  return (
    <div className="foodandbeverages">
      <h2
        style={{
          fontFamily: "calibri",
          marginTop: 50,
          marginLeft: 830,
          fontSize: 32,
          fontWeight: 400,
          color: "#031144",
        }}>
        STORE DIRECTORIES
      </h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        style={{
          fontFamily: "calibri",
          fontSize: 22,
          padding: 10,
          marginTop: 40,
          marginLeft: 1480,
          width: 330,
          height: 50,
          borderRadius:1
        }}></input>

      <div className="cardContainer">
        {filteredStoreData.map((store) => (
          <Link to={`/fooddescription/${store._id}`}>
          <div className="card">
            <div className="imageContainer">
              <img src={`/uploads/${store.storeImage}`} />
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodBeverages;
