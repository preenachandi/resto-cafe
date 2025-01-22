import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuData } from "../redux/menuSlice";
import Categories from "./Categories";
import Header from "./Header";

const Navbar = () => {
  const dispatch = useDispatch();
  const { menuData, loading } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="w-full border-b border-gray-300">
        <div className="flex overflow-x-auto no-scrollbar mx-4 md:mx-20">
          {menuData.map((tab, index) => (
            <button
              key={index}
              className="py-2 px-4 whitespace-nowrap text-sm sm:text-lg font-semibold"
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {menuData.length > 0 ? (
            <Categories dishes={menuData[0].categoryDishes} />
          ) : (
            <p className="text-center text-gray-500">Loading menu...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
