import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { usersActions } from "../slices/UsersSlice";

const ENDPOINTS = {USERS: 'https://jsonplaceholder.typicode.com/users'};

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, {dispatch}: any)=> {
        try{
            const {data} = await axios.get(ENDPOINTS.USERS);
            console.log(data);
            dispatch(usersActions.setUsers(data));
        }catch(e){
            return toast.error(`Произошла ошибка! Проверьте подключение к интернету ${e}`);
        }
    }
)

