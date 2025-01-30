import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./Piechart.css";
import axios from "axios";

function Piechart() {
  const [itemCount, setItemCount] = useState(0);
  const [pendingCount, setpendingCount] = useState(0);
  const [completeCount, setcompleteCount] = useState(0);

  useEffect(() => {
    axios.get("/api/item/getItemCount").then((response) => {
      setItemCount(response.data.count);
    });
    axios.get("/api/preOrder/pendingOrderCount").then((response) => {
      setpendingCount(response.data.count);
    });
    axios.get("/api/preOrder/completedOrderCount").then((response) => {
      setcompleteCount(response.data.count);
    });
  }, []);

  const data = [
    { name: "Total Items", value: itemCount },
    { name: "Total Pre Orders", value: pendingCount },
    { name: "Total Complete Orders", value: completeCount },
  ];

  const COLORS = [
    "#ffc000", //yellow Total Items
    "#4472c4", //green color Total Pre Orders
    "#ed7d31", //red color Total Complete Orders
  ];

  return (
    <div className="pchrt">
      <ResponsiveContainer width={250} height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={0}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Piechart;
