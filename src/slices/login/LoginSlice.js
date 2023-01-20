import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../../helper/ReduxHelper';
import axios from 'axios';

export const addUser = createAsyncThunk('LoginSlice/addUser', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(process.env.REACT_APP_LOGIN_URL + '/signUp', payload);

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    console.log(result);

    return result;
});

export const checkValue = createAsyncThunk('LoginSlice/checkValue', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/check/${payload.fieldName}/${payload.value}`);

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result.item;
});

export const makeLogin = createAsyncThunk('LoginSlice/makeLogin', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(`${process.env.REACT_APP_LOGIN_URL}/signIn`, {
            userId: payload.userId,
            userPw: payload.userPw
        });

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const LoginSlice = createSlice({
    name: 'LoginSlice',
    initialState: {
        data: null,
        pagenation: null,
        loading: false,
        error: null
    },
    reducers: {
        getCurrentUser: (state, action) => {
            return state;
        }
    },
    extraReducers: {
        [addUser.pending]: pending,
        [addUser.fulfilled]: fulfilled,
        [addUser.rejected]: rejected,

        [checkValue.pending]: pending,
        [checkValue.fulfilled]: fulfilled,
        [checkValue.rejected]: rejected,

        [makeLogin.pending]: pending,
        [makeLogin.fulfilled]: fulfilled,
        [makeLogin.rejected]: rejected,
    }
});

export const { getCurrentUser } = LoginSlice.actions;

export default LoginSlice.reducer;