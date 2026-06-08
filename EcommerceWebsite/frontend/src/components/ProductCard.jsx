import { Link } from "react-router-dom";
import API from "../services/api";

function ProductCard({ product, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Delete ${product.name}?`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${product._id}`);

      alert("Product Deleted Successfully");

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{
            height: "280px",
            objectFit: "cover"
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/500x300?text=No+Image";
          }}
        />

        <div className="card-body d-flex flex-column">

          <h4>{product.name}</h4>

          <p>{product.description}</p>

          <h5 className="text-success fw-bold">
            ₹{product.price}
          </h5>

          <div className="mt-auto">

            <Link
              to={`/product/${product._id}`}
              className="btn btn-primary w-100 mb-2"
            >
              View Details
            </Link>

            <button
              className="btn btn-danger w-100"
              onClick={handleDelete}
            >
              Delete Product
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;