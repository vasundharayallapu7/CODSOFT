import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />

        <div
          className="text-white text-center py-5"
          style={{
            background:
              "linear-gradient(135deg,#0d6efd,#6610f2)",
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1 className="display-3 fw-bold">
              Welcome To ShopEZ
            </h1>

            <p className="lead mt-3">
              Login to explore our latest
              Mobiles, Laptops and Accessories.
            </p>

            <Link
              to="/login"
              className="btn btn-warning btn-lg mt-3"
            >
              Login Now
            </Link>
          </div>
        </div>
      </>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div
        className="text-white text-center py-5"
        style={{
          background:
            "linear-gradient(135deg,#0d6efd,#6610f2)",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">
            Welcome To ShopEZ
          </h1>

          <p className="lead">
            Discover the latest Mobiles,
            Laptops and Accessories.
          </p>
        </div>
      </div>

      <div className="container mt-5">

        <h2 className="text-center mb-4">
          Featured Products
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search Products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="form-control mb-4"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          <option value="Mobiles">
            Mobiles
          </option>

          <option value="Laptops">
            Laptops
          </option>

          <option value="Accessories">
            Accessories
          </option>
        </select>

        <div className="row">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      </div>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <h5>ShopEZ</h5>

          <p>
            Your one-stop destination for
            Mobiles, Laptops and Accessories.
          </p>

          <p className="mb-0">
            © 2026 ShopEZ. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;