import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchSection() {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    navigate(
      `/jobs?title=${jobTitle}&location=${location}&category=${category}`
    );
  };

  return (
    <section className="search-section">

      <h2>Search Jobs</h2>

      <div className="search-container">

        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) =>
            setJobTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="Software">
            Software
          </option>

          <option value="Marketing">
            Marketing
          </option>

          <option value="Design">
            Design
          </option>
        </select>

        <button onClick={handleSearch}>
          Search
        </button>

      </div>

    </section>
  );
}

export default SearchSection;