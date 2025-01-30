import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Piechart = () => {
    const Data = [
        { name: "Total Customers", value: 10 },
        { name: "Total Shop Owners", value: 10 },
        { name: "Total Stores", value: 12 },
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
                data={Data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={0}
                label
              >
                {Data.map((entry, index) => (
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

export default Piechart