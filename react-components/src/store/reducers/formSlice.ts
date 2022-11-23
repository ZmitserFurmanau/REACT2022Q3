import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormData } from '../../types/types';

interface FormState {
  name: string;
  date: string;
  delivery: string;
  time: string;
  image: string;
  agree: string;
  formStatesArr: FormData[] | [];
}

const initialState: FormState = {
  name: '',
  date: '',
  delivery: 'default',
  time: '',
  image: '',
  agree: '',
  formStatesArr: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setDelivery: (state, action: PayloadAction<string>) => {
      state.delivery = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setAgree: (state, action: PayloadAction<string>) => {
      state.agree = action.payload;
    },
    setFormStatesArr: (state, action: PayloadAction<FormData[]>) => {
      state.formStatesArr = action.payload;
    },
  },
});

export const { setName, setDate, setDelivery, setTime, setImage, setAgree, setFormStatesArr } =
  formSlice.actions;

export default formSlice.reducer;
