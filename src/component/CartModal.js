import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, deleteItem } from "../redux/cartSlice";

const CartModal = ({ closeCart }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const menuData = useSelector((state) => state.menu.menuData);  // Get menu data from Redux
  const dispatch = useDispatch();

  // Function to get dish name by filtering menuData
  const getDishName = (dishId) => {
    for (const category of menuData) {
      const foundDish = category.categoryDishes.find(dish => dish.dish_id === dishId);
      if (foundDish) return foundDish.dish_name;
    }
    return "Unknown Item";  // Default if not found
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {Object.keys(cartItems).length > 0 ? (
          Object.entries(cartItems).map(([key, item]) => (
            <div key={key} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{getDishName(item.dishId)}</p>
                {item.addons.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Add-ons: {item.addons.map(addon => addon.dish_name).join(", ")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(removeItem({ dishId: item.dishId, addons: item.addons }))}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(addItem({ dishId: item.dishId, addons: item.addons }))}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(deleteItem({ dishId: item.dishId, addons: item.addons }))}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  x
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={(closeCart)} className="px-4 py-2 bg-red-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
