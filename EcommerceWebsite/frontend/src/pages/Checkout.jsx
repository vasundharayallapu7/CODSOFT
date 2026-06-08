import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Checkout() {
  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });

  useEffect(() => {
    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartItems);
  }, []);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.paymentMethod
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      alert(
        `Payment Successful via ${formData.paymentMethod}`
      );

      const orderData = {
        ...formData,
        items: cart,
        totalAmount,
        paymentStatus: "Paid",
      };

      await API.post(
        "/orders",
        orderData
      );

      localStorage.removeItem("cart");

      alert("Order Placed Successfully!");

      window.location.href = "/orders";

    } catch (error) {
      console.log(error);
      alert("Failed To Place Order");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Checkout
        </h2>

        <div className="row">

          <div className="col-md-6">

            <div className="card p-4 shadow">

              <h4 className="mb-3">
                Customer Details
              </h4>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="form-control mb-3"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="form-control mb-3"
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea
                rows="4"
                name="address"
                placeholder="Delivery Address"
                className="form-control mb-3"
                value={formData.address}
                onChange={handleChange}
              />

              <select
                className="form-control mb-3"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">
                  Select Payment Method
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Credit Card">
                  Credit Card
                </option>

                <option value="Debit Card">
                  Debit Card
                </option>

                <option value="Cash On Delivery">
                  Cash On Delivery
                </option>
              </select>

            </div>

          </div>

          <div className="col-md-6">

            <div className="card p-4 shadow">

              <h4 className="mb-3">
                Order Summary
              </h4>

              {cart.length === 0 ? (
                <p>No Items In Cart</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between border-bottom pb-2 mb-2"
                    >
                      <span>
                        {item.name}
                      </span>

                      <span>
                        ₹{item.price}
                      </span>
                    </div>
                  ))}

                  <h5 className="mt-3">
                    Total: ₹{totalAmount}
                  </h5>

                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handlePayment}
                  >
                    Pay Now
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Checkout;