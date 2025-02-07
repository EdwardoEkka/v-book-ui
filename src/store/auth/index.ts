import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface userDetails {
  user: User;
  isAuthenticated: Boolean;
}

const initialState: userDetails = {
  user: { id: "", email: "", name: "" },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action?.payload;
    },
    clearUserDetails: (state) => {
      state.user = { id: "", email: "", name: "" };
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action?.payload;
    },
  },
});

export const { setUserDetails, clearUserDetails, setIsAuthenticated } =
  userSlice.actions;

export default userSlice.reducer;
