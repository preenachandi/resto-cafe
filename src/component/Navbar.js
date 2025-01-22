import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "../Api/CategoriesApi";
import Categories from "./Categories";
import Header from "./Header";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get order count from Redux store
  const orderCount = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const getMenuCategories = async () => {
      const result = await fetchData();
      if (result?.data?.[0]?.table_menu_list) {
        const menuCategories = result.data[0].table_menu_list.map((item) => ({
          title: item.menu_category,
          categoryDishes: item.category_dishes,
        }));
        setTabs(menuCategories);
        setMenuData(menuCategories);
      }
      setLoading(false);
    };

    getMenuCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Header Component */}
      <Header orderCount={orderCount} />

      {/* Tabs and Menu Section */}
      <div className="w-full border-b border-gray-300">
        <div className="flex overflow-x-auto no-scrollbar mx-4 md:mx-20">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 whitespace-nowrap text-sm sm:text-lg font-semibold ${
                activeTab === index ? "text-red-600 border-b-2 border-red-600" : "text-gray-600"
              } transition-all`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {menuData && menuData[activeTab]?.categoryDishes ? (
            <Categories dishes={menuData[activeTab].categoryDishes} />
          ) : (
            <p className="text-center text-gray-500">Loading menu...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
