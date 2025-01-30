import React, { useEffect, useState } from "react";
import "./Items.css";
import Item from "../Item/Item";
import axios from "axios";

function Items() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("/api/item/getAllItems");
        setItems(response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItems();
  }, []);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredItems = items.filter((item) => {
      return item.itemName.toLowerCase().includes(searchQuery);
    });
    setFilteredItems(filteredItems);
  };

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : items;

  return (
    <div className="items-page">
      <div className="items-search">
        <input
          type="text"
          placeholder="Search"
          name="searchQuery"
          onChange={handleSearch}
        />
      </div>
      <div className="all-items">
        {itemsToDisplay.map((item) => (
          <Item item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default Items;
