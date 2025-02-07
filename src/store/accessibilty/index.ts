import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccessibilityOptions {
  isDark: boolean;
}

const initialState: AccessibilityOptions = {
  isDark: true,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setAccessibilityOptions: (state, action: PayloadAction<AccessibilityOptions>) => {
      state.isDark = action.payload.isDark;
    },
  },
});

export const { setAccessibilityOptions } = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
