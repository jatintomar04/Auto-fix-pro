import { combineSlices, configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import complaint from "./complaints/ComplaintsSlice"
import comment  from "./comments/commentsSlice"

export const store = configureStore({
    reducer :{auth, complaint, comment },
})