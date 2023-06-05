import { configureStore } from "@reduxjs/toolkit";
import colorModeReducer from "../reducer/colorModeSlice";
import userReducer from "../reducer/userSlice";
import selectedFriendsReducer from "../reducer/selectedFriendsSlice";

const store = configureStore({
  reducer: {
    colorMode: colorModeReducer,
    user: userReducer,
    selectedFriends: selectedFriendsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
