import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from "../Api/CategoriesApi";


// Async thunk to fetch menu data
export const fetchMenuData = createAsyncThunk('menu/fetchMenuData', async () => {
  const result = await fetchData();
  if (result?.data?.[0]?.table_menu_list) {
    return result.data[0].table_menu_list.map((item) => ({
      title: item.menu_category,
      categoryDishes: item.category_dishes,
    }));
  }
  return [];
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.menuData = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
