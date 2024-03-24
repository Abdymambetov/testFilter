import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../actions/UsersAction";
import { RootState, store } from '../store';

const name = 'users';

const initialState = {
    usersStatus: 'not requested',
    users: [],
    loading: false,
    usersError: null,
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers:{
        setUsers(state, action){
            state.users = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled, (state) => {
            state.loading = false
        })
    },
});

export default usersSlice;
export const { actions: usersActions } = usersSlice
export const usersSelect = (state: RootState) => state[ name ];
export type AppDispatch = typeof store.dispatch 