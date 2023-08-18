import React from "react";
import "./CategoryCard.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function CategoryCard({ name, handleCategory, categoryName }) {
  const activeCategoryName = useSelector((state) => state.activeCategory);
  const activeSubCategoryName = useSelector((state) => state.activeSubCategory);

  return (
    <div
      onClick={() => {
        handleCategory(name);
      }}
      style={{
        backgroundColor:
          (categoryName === "category"
            ? activeCategoryName
            : activeSubCategoryName) === name
            ? "#f2f1b5"
            : "transparent",
      }}
      className="catCard rounded d-flex align-items-center gap-2"
    >
      <div>{name}</div>
      {(categoryName === "category"
        ? activeCategoryName
        : activeSubCategoryName) === name && <RiCloseCircleLine />}
    </div>
  );
}

export default CategoryCard;
