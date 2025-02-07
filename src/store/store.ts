import { configureStore } from "@reduxjs/toolkit";
import searchingSlice from "./search";
import userSlice from "./auth";
import accessibilitySlice from "./accessibilty";

export const store = configureStore({
  devTools: true,
  reducer: {
    search: searchingSlice,
    user: userSlice,
    accessibilty: accessibilitySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
