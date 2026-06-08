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

        <h2 className="text-center mb-4">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <h4 className="text-center">
            No Orders Found
          </h4>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="card p-4 shadow mb-4"
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

              <p>
                Payment: {order.paymentMethod}
              </p>

              <p>
                Status:
                <span className="badge bg-success ms-2">
                  {order.paymentStatus}
                </span>
              </p>

              <h5 className="mt-3">
                Products
              </h5>

              {order.items?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>
                      {item.name}
                    </span>

                    <span>
                      ₹{item.price}
                    </span>
                  </div>
                )
              )}

              <h4 className="text-end mt-3">
                Total: ₹{order.totalAmount}
              </h4>

            </div>
          ))
        )}

      </div>
    </>
  );
}

export default Orders;