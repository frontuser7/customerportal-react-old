import React, { useEffect, useState } from "react";
import "./Menu.css";
import Mybutton from "../../Components/Button/Mybutton";
import MenuCard from "../../Components/MenuCard/MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ShowItems from "../../Components/ShowItems/ShowItems";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import { addFilteredItemList } from "../../Store/getFilteredItemsSlice";
import { setActiveCategory } from "../../Store/activeCatBtnSlice";
import { setActiveSubCategory } from "../../Store/activeSubCatBtnSlice";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [filteredItem, setFilteredItem] = useState(null);
  const [searchText, setSearchText] = useState("");

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const restData = useSelector((state) => state.restoData);
  const tablepin = useSelector((state) => state.session);
  const menuData = useSelector((state) => state.menuList.data);
  const addToCartData = useSelector((state) => state.addToCartItems);
  const Ids = useSelector((state) => state.resto_TableId);
  const langData = useSelector((state) => state.restoData);
  const filteredItemData = useSelector((state) => state.filteredItemList);
  const activeCategoryName = useSelector((state) => state.activeCategory);

  // console.log(menuData);

  let key = "name";
  const categoryList = [
    ...new Map(
      menuData.item.map((item) => [item.category[key], item.category])
    ).values(),
  ];

  const subcategoryList = [
    ...new Map(
      menuData.item.map((item) => [
        item.subcategory[key],
        { cat: item.category, subCat: item.subcategory },
      ])
    ).values(),
  ];

  // data destructure
  let { session_pin } = tablepin;
  let { restaurant_id, table_id } = Ids;
  let { currency } = langData;
  let { is_pin_enable } = restData;

  // console.log(restData);

  // navigate to cart page
  const handleClick = () => {
    navigate(`/viewcart/${restaurant_id}/${table_id}`);
  };

  const [filteredByCategory, setFilteredByCategory] = useState(null);
  const [filteredBySubCategory, setFilteredBySubCategory] = useState(null);

  let subCat = [];

  useEffect(() => {
    subCat = [];
    if (activeCategoryName) {
      for (let i = 0; i < subcategoryList.length; i++) {
        if (subcategoryList[i].cat.name === activeCategoryName) {
          subCat.push(subcategoryList[i].subCat);
        }
      }
      setSubCategory(subCat);
    }
  }, []);

  const handleCategory = (name) => {
    setSubCategoryName(null);
    dispatch(setActiveSubCategory(null));
    if (categoryName !== name) {
      dispatch(setActiveCategory(name));
      setCategoryName(name);
      setSubCategory(null);
      let filteredByCategoryArr = menuData.item.filter((item) => {
        return item.category.name === name;
      });
      dispatch(addFilteredItemList(filteredByCategoryArr));
      setFilteredByCategory(filteredByCategoryArr);
      setFilteredItem(filteredByCategoryArr);
      subCat = [];
      for (let i = 0; i < subcategoryList.length; i++) {
        if (subcategoryList[i].cat.name === name) {
          subCat.push(subcategoryList[i].subCat);
        }
      }
      setSubCategory(subCat);
    } else {
      setSubCategory(null);
      setCategoryName(null);
      setFilteredItem(null);
      dispatch(setActiveCategory(null));
      dispatch(addFilteredItemList(null));
    }
  };

  const handleSubCategory = (name) => {
    if (subCategoryName !== name) {
      dispatch(setActiveSubCategory(name));
      setSubCategoryName(name);
      let filteredBySubCategoryArr = menuData.item.filter((item) => {
        return item.subcategory.name === name;
      });
      dispatch(addFilteredItemList(filteredBySubCategoryArr));
      setFilteredBySubCategory(filteredBySubCategoryArr);
      setFilteredItem(filteredBySubCategoryArr);
    } else {
      setSubCategoryName(null);
      setSubCategory(null);
      setFilteredItem(filteredByCategory);
      dispatch(setActiveSubCategory(null));
      dispatch(setActiveCategory(null));
      dispatch(addFilteredItemList(null));
    }
  };

  // search
  let searchItems = [];

  const handleSearch = (e) => {
    searchItems = menuData.item.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // console.log(searchItems);
    dispatch(addFilteredItemList(searchItems));
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center menuPage">
        <ToastContainer />
        {/* Table Pin */}
        {is_pin_enable && (
          <>
            {session_pin && (
              <Mybutton
                name={`Table Pin : ${session_pin}`}
                backgroundColor="#CEEDC7"
                color="#7ea975"
              />
            )}
          </>
        )}
        {/* category list */}
        <div className="overflow-hidden w-100">
          <div className="mt-3 mx-2 d-flex align-items-center gap-2 w-max overflow-auto">
            {categoryList &&
              categoryList.map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
                    name={item.name}
                    handleCategory={handleCategory}
                    categoryName="category"
                  />
                );
              })}
          </div>
        </div>
        {/* subcategory list */}
        {subCategory && (
          <div className="overflow-hidden w-100">
            <div className="mt-2 mx-2 d-flex align-items-center gap-2 w-max overflow-auto">
              {subCategory &&
                subCategory.map((item, index) => {
                  return (
                    <CategoryCard
                      key={index}
                      name={item.name}
                      handleCategory={handleSubCategory}
                      categoryName="subcategory"
                    />
                  );
                })}
            </div>
          </div>
        )}
        {/* search box */}
        <div className="d-grid">
          <input
            type="text"
            className="m-2 text-center rounded-3 search-item"
            placeholder="Search Items..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch(e);
            }}
          />
        </div>

        {/* Menu Cards */}
        <div className="row justify-content-start align-items-baseline mt-2 w-100 overflow-hidden">
          {menuData &&
            (filteredItemData !== null ? filteredItemData : menuData.item).map(
              (item, index) => {
                return (
                  <div key={index} className="col-6 col-md-4 col-lg-3 mt-2">
                    <MenuCard
                      id={item.id}
                      menuItemIndex={menuData.item.findIndex(
                        (element) => element.name === item.name
                      )}
                      logo={item.item_logo}
                      filteredItemIndex={
                        filteredItemData &&
                        filteredItemData.findIndex(
                          (element) => element.name === item.name
                        )
                      }
                      name={item.name}
                      description={item.long_desc}
                      price={item.price}
                      out_of_stock={item.out_of_stock}
                      itemcount={item.count}
                      currency={currency}
                      extraItems={item.extra_item_item}
                    />
                  </div>
                );
              }
            )}
        </div>
      </div>
      {addToCartData.length > 0 && (
        <div className="position-fixed bottom-0 w-100">
          <ShowItems
            buttonName="View Cart"
            backgroundColor={"#C3EDC0"}
            color={"#436840"}
            currency={currency}
            handleClick={handleClick}
          />
        </div>
      )}
    </>
  );
}

export default Menu;
