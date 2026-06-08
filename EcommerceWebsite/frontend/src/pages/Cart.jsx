import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartItems);
  }, []);

  const removeItem = (index) => {
    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <h4>Your Cart Is Empty</h4>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="card p-3 mb-3"
              >
                <div className="row align-items-center">

                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                    />
                  </div>

                  <div className="col-md-6">
                    <h5>{item.name}</h5>

                    <p>{item.description}</p>
                  </div>

                  <div className="col-md-2">
                    ₹{item.price}
                  </div>

                  <div className="col-md-2">
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        removeItem(index)
                      }
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <Link
              to="/checkout"
              className="btn btn-success"
            >
              Proceed To Checkout
            </Link>
          </>
        )}

      </div>
    </>
  );
}

export default Cart;