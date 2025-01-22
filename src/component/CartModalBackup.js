import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/cartSlice'; // Ensure correct path

const CartModal = ({ 
  cartItems = [], 
  closeCart, 
  selectedDish, 
  selectedAddons = [], 
  onAddonQuantityChange 
}) => {
  const dispatch = useDispatch();

  
  const totalAmount = cartItems.reduce((acc, item) => 
    acc + (item.quantity || 0) * (item.price || 0), 
  0);

  return (
    <></>
  );
};

export default CartModal;
