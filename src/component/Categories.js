import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/cartSlice';
import AddonModal from './AddonModal';

const Categories = ({ dishes }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Add the dish to the cart directly or open modal for add-ons
  const handleAddToCart = (dish) => {
    // If the dish has add-ons
    if (dish.addonCat?.length > 0) {
      setSelectedDish(dish);
      setSelectedAddons([]); // Reset selected add-ons
    } else {
      // Directly add the dish to the cart with no add-ons
      dispatch(addItem({ dishId: dish.dish_id, addons: [] }));
    }
  };

  // Function to calculate total quantity of a dish, including add-ons
const getDishQuantity = (dishId) => {
  return Object.keys(cartItems).reduce((total, key) => {
    if (key.startsWith(dishId)) {
      total += cartItems[key].quantity;
    }
    return total;
  }, 0);
};

  // Handle addon quantity changes (add/remove)
  const handleAddonQuantityChange = (addon, action) => {
    setSelectedAddons((prev) => {
      const existingAddon = prev.find((item) => item.dish_id === addon.dish_id);

      if (action === 'add') {
        if (existingAddon) {
          return prev.map((item) =>
            item.dish_id === addon.dish_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { ...addon, quantity: 1 }];
        }
      }

      if (action === 'remove' && existingAddon?.quantity > 1) {
        return prev.map((item) =>
          item.dish_id === addon.dish_id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      if (action === 'remove' && existingAddon?.quantity === 1) {
        return prev.filter((item) => item.dish_id !== addon.dish_id);
      }

      return prev;
    });
  };

  // Confirm addition of dish and selected addons to cart
  const confirmAddToCart = () => {
    dispatch(addItem({ dishId: selectedDish.dish_id, addons: selectedAddons }));
    setSelectedDish(null);
    setSelectedAddons([]);
  };

  return (
    <div>
      {dishes.map((dish) => (
  <div
    key={dish.dish_id}
    className="flex justify-between items-center border-b border-gray-300 py-4 px-4 md:px-20"
  >
    <div className="flex-1">
      <h3 className="text-lg font-bold">{dish.dish_name}</h3>
      <p className="text-sm text-gray-600">{dish.dish_description}</p>
      <p className="text-green-600 font-semibold">
        {dish.dish_currency} {dish.dish_price}
      </p>
      <div className="mt-2 flex items-center space-x-2">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded-md"
          onClick={() => dispatch(removeItem({ dishId: dish.dish_id }))}
        >
          -
        </button>
        <span className="text-lg font-bold">{getDishQuantity(dish.dish_id)}</span>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded-md"
          onClick={() => handleAddToCart(dish)}
        >
          +
        </button>
      </div>
    </div>
    <img
      src={dish.dish_image}
      alt={dish.dish_name}
      className="w-24 h-24 object-cover rounded-md"
    />
  </div>
))}

      {/* Show AddonModal only if selectedDish has add-ons */}
      {selectedDish && selectedDish.addonCat?.length > 0 && (
        <AddonModal
          selectedDish={selectedDish}
          selectedAddons={selectedAddons}
          onAddonQuantityChange={handleAddonQuantityChange}
          onCancel={() => setSelectedDish(null)}
          onConfirm={confirmAddToCart}
        />
      )}
    </div>
  );
};

export default Categories;
