import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SortDropdown = ({ sortOption, changeSortOption, page }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-dark"
        id="dropdown-basic"
        style={{ width: "170px" }}
      >
        {sortOption === "no-asc"
          ? "Oldest"
          : sortOption === "no-desc"
          ? "Newest"
          : sortOption === "active-asc"
          ? "Active First"
          : sortOption === "active-desc"
          ? "No Active First"
          : sortOption === "point-asc"
          ? "Point (Low to High)"
          : sortOption === "point-desc" && "Point (High to Low)"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          className={sortOption === "no-desc" ? "custom-active" : ""}
          onClick={() => changeSortOption("no-desc")}
        >
          Newest
        </Dropdown.Item>
        <Dropdown.Item
          className={sortOption === "no-asc" ? "custom-active" : ""}
          onClick={() => changeSortOption("no-asc")}
        >
          Oldest
        </Dropdown.Item>
        {["service", "customer", "staff"].includes(page) && (
          <>
            <Dropdown.Item
              className={sortOption === "active-asc" ? "custom-active" : ""}
              onClick={() => changeSortOption("active-asc")}
            >
              Active First
            </Dropdown.Item>
            <Dropdown.Item
              className={sortOption === "active-desc" ? "custom-active" : ""}
              onClick={() => changeSortOption("active-desc")}
            >
              No Active First
            </Dropdown.Item>
          </>
        )}
        {page === "customer" && (
          <>
            <Dropdown.Item
              className={sortOption === "point-asc" ? "custom-active" : ""}
              onClick={() => changeSortOption("point-asc")}
            >
              Point (Low to High)
            </Dropdown.Item>
            <Dropdown.Item
              className={sortOption === "point-desc" ? "custom-active" : ""}
              onClick={() => changeSortOption("point-desc")}
            >
              Point (High to Low)
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
