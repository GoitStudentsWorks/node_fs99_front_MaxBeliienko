import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const asyncThunkWrapper = asyncFunction => async (args, thunkAPI) => {
  try {
    return await asyncFunction(args, thunkAPI);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const getUserProfile = createAsyncThunk(
  'users/user-profile',
  asyncThunkWrapper(async id => {
    const { data } = await axios.get('/users/user-profile', id);
    return data;
  })
);

export const updateUserProfile = createAsyncThunk(
  'users/user-update',
  asyncThunkWrapper(async user => {
    const { data } = await axios.patch('/users/user-profile', user);
    return data;
  })
);
