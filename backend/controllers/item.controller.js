const Item = require("../models/item.model");

//create item
const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    return res.status(200).json({ message: "item created", item });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

//get all item count
const getItemCount=async(req,res)=>{
  try {
    const itemCount = await Item.countDocuments();
    return res.json({ count: itemCount });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

//get single item details
const getItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById({ _id: id });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Item not deleted" });
  }
};

//update item details
const updateItem = async (req, res) => {
  const { itemName, price, description, imageUrls } = req.body;
  try {
    const item = await Item.findById({ _id: req.params.id });
    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }
    if (itemName) item.itemName = itemName;
    if (price) item.price = price;
    if (description) item.description = description;
    if (imageUrls) item.imageUrls = imageUrls;

    await item.save();
    return res.status(200).json({ message: "item updated", item });
  } catch (error) {
    return res.status(400).json({ message: "item update error" });
  }
};

module.exports = { createItem, getAllItems, getItem, deleteItem, updateItem ,getItemCount};
