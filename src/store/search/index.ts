import { createSlice } from "@reduxjs/toolkit";

interface searchData {
  searchString: string;
}

const initialState: searchData = {
  searchString: "",
};

const searchingSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchingData: (state, action) => {
      state.searchString = action?.payload;
    },
    clearSearchingData: (state, action) => {
      state.searchString = initialState.searchString;
    },
  },
});

export const { setSearchingData, clearSearchingData } = searchingSlice.actions;

export default searchingSlice.reducer;
