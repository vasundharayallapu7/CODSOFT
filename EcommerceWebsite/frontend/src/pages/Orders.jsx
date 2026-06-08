import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <h4>No Orders Found</h4>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="card p-3 mb-3 shadow"
            >
              <h5>
                Customer: {order.name}
              </h5>

              <p>
                Email: {order.email}
              </p>

              <p>
                Phone: {order.phone}
              </p>

              <p>
                Address: {order.address}
              </p>

              <h6>
                Total Amount: ₹
                {order.totalAmount}
              </h6>

              <small>
                Ordered On:{" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </small>
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default Orders;