import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { fetchData } from '../Api/CategoriesApi';
import CartModal from './CartModal';

const Header = () => {
  const [cafeName, setCafeName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => Object.values(state.cart.items));

  useEffect(() => {
    const getCafeName = async () => {
      const result = await fetchData();
      if (result?.data?.[0]?.restaurant_name) {
        setCafeName(result.data[0].restaurant_name);
      }
      setLoading(false);
    };

    getCafeName();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col border-gray-300 py-4 mx-20">
      <h1 className="text-2xl border-b font-bold mb-4">Web Interface</h1>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-600">
          {cafeName || 'Loading...'}
        </span>
        <div className="relative flex items-center">
          <span className="mr-2 text-gray-700 hidden md:inline">My Orders</span>
          <FaShoppingCart 
            className="text-xl text-black cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          />
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </div>
      </div>

      {/* Show CartModal when cart icon is clicked */}
      {isCartOpen && <CartModal closeCart={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default Header;
