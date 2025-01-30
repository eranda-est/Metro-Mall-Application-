import React, { useEffect, useState } from "react";
import "./Preorder.css"
import PreorderItem from '../preorderItem/PreorderItem'
import axios from "axios";

function Preorder() {

 const[preOrders,setPreOrders]=useState([]);

 useEffect(() => {
  async function fetchpreOrders() {
    try {
      const response = await axios.get("/api/preOrder/getPendingPreOrders");
      setPreOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchpreOrders();
}, []);

  return (
    <div className='preorder-page'>
        <h2>My Pre Orders</h2>
        <div className='preorder-item'>
          {preOrders.map((preOrder)=>(
              <PreorderItem preOrder={preOrder} key={preOrder._id}/>
          ))}
            
        </div>
    </div>
  )
}

export default Preorder