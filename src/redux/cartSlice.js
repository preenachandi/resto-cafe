import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {}, 
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { dishId, dishName, addons = [] } = action.payload;

      const itemKey = addons.length > 0
        ? `${dishId}-${addons.map((addon) => addon.dish_id).join('-')}`
        : `${dishId}`;

      if (state.items[itemKey]) {
        state.items[itemKey].quantity += 1;
      } else {
        state.items[itemKey] = {
          dishId,
          dishName,  // Store the dish name here
          addons,
          quantity: 1,
        };
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const { dishId, addons = [] } = action.payload;

      const itemKey = addons.length > 0
        ? `${dishId}-${addons.map((addon) => addon.dish_id).join('-')}`
        : `${dishId}`;

      if (state.items[itemKey] && state.items[itemKey].quantity > 0) {
        state.items[itemKey].quantity -= 1;
        state.totalQuantity -= 1;
      }
      if (state.items[itemKey]?.quantity === 0) {
        delete state.items[itemKey];
      }
    },
    deleteItem: (state, action) => {
      const { dishId, addons = [] } = action.payload;

      const itemKey = addons.length > 0
        ? `${dishId}-${addons.map((addon) => addon.dish_id).join('-')}`
        : `${dishId}`;

      if (state.items[itemKey]) {
        state.totalQuantity -= state.items[itemKey].quantity;
        delete state.items[itemKey];
      }
    },
  },
});

export const { addItem, removeItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
