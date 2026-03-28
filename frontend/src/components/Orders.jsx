import React, { useEffect, useState } from "react"; 
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-600 p-4 md:p-6">
      <h2 className="text-2xl font-medium my-6 md:my-10 text-center text-white">Orders List</h2>

      {/* Table container with horizontal scroll on small screens */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <table className="w-full border border-white/20 rounded-lg text-white">
          <thead className="bg-blue-200 text-black">
            <tr>
              {/* Hide Index column, do not show */}
              {/* <th className="px-2 py-1 text-md font-medium border">#</th> */}
              
              <th className="px-2 py-1 text-md font-medium border">File Name</th>
              <th className="px-2 py-1 text-md font-medium border">Pages</th>
              <th className="px-2 py-1 text-md font-medium border">Type</th>
              <th className="px-2 py-1 text-md font-medium border">Copies</th>
              <th className="px-2 py-1 text-md font-medium border">Price</th>
            </tr>
          </thead>

         <tbody>
  {orders.map((order, index) => (
    <tr
      key={index}
      className="text-center border-b border-white/20 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/30"
    >
      <td className="p-2 border">{order.fileName}</td>
      <td className="p-2 border">{order.pageCount}</td>
      <td className="p-2 border">{order.printType}</td>
      <td className="p-2 border">{order.copies}</td>
      <td className="p-2 border">₹{order.totalPrice}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;