import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please Login First");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product Added To Cart");
  };

  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row">

          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6">

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3 className="text-success">
              ₹{product.price}
            </h3>

            <p>
              Category: {product.category}
            </p>

            <button
              className="btn btn-success"
              onClick={addToCart}
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;