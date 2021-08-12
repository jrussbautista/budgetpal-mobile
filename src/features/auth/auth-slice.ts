import { Status } from './../../types/Status';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import * as AuthAPI from './auth-api';
import apiClient from '../../lib/api-client';
import { User } from '../users/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ValidationErrors {
  errors: Record<string, string>;
  message: string;
}

const persistCurrentUser = async (user: User, token: string) => {
  await AsyncStorage.setItem('@currentUserToken', token);
  await AsyncStorage.setItem('@currentUser', JSON.stringify(user));
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loadCurrentUser = createAsyncThunk(
  'user/loadCurrentUser',
  async () => {
    const results = await AsyncStorage.getItem('@currentUser');
    if (results) {
      const userDetails = JSON.parse(results);
      console.log(userDetails);
      return userDetails;
    }

    return null;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthAPI.login(email, password);
      const { token, user } = response.data.data;
      await persistCurrentUser(user, token);
      return user;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;

      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

interface InitialState {
  user: User | null;
  error: string | null | undefined;
  status: Status;
}

const initialState: InitialState = {
  user: null,
  error: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'succeed';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'failed';
    });
    builder.addCase(login.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export default authSlice.reducer;
