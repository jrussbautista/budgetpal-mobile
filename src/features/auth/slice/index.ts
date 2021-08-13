import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as AuthAPI from '../api';

import { User } from '@/features/users/types';
import apiClient from '@/lib/api-client';
import { Status } from '@/types';

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
    const currentUser = await AsyncStorage.getItem('@currentUser');
    const userToken = await AsyncStorage.getItem('@currentUserToken');
    if (currentUser && userToken) {
      const userDetails = JSON.parse(currentUser);
      apiClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;

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
