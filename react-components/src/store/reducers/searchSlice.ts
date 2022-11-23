import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { GuardianResponseItem, ArticleData, GuardianResponse, GetData } from '../../types/types';

interface SearchState {
  query: string;
  dataArr: GuardianResponseItem[] | [];
  sort: string;
  totalPages: number | null;
  currentPage: number;
  itemsPerPage: number;
  articleData: ArticleData | null;
  isLoading: boolean;
  error: string;
}

const initialState: SearchState = {
  query: '',
  dataArr: [],
  sort: 'newest',
  totalPages: null,
  currentPage: 1,
  itemsPerPage: 20,
  articleData: null,
  isLoading: false,
  error: '',
};

const endpointUrl = 'https://content.guardianapis.com/search';
const apiKey = '051365e1-719b-4927-a68e-1ea61a86b81c';

export const getData = createAsyncThunk(
  'search/getData',
  async ({ query, sort, itemsPerPage, currentPage }: GetData, { rejectWithValue }) => {
    try {
      const response = await axios.get<GuardianResponse>(
        `${endpointUrl}?q=${query}&show-fields=all&api-key=${apiKey}&page-size=${itemsPerPage}&page=${currentPage}&order-by=${sort}`
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return e;
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setData: (state, action: PayloadAction<GuardianResponseItem[]>) => {
      state.dataArr = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setArticleData: (state, action: PayloadAction<ArticleData>) => {
      state.articleData = action.payload;
    },
  },
  extraReducers: {
    [getData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getData.fulfilled.type]: (state, action: PayloadAction<GuardianResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.dataArr = action.payload.response.results;
      state.totalPages = action.payload.response.pages;
    },
    [getData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setQuery,
  setData,
  setSorting,
  setTotalPages,
  setCurrentPage,
  setItemsPerPage,
  setArticleData,
} = searchSlice.actions;

export default searchSlice.reducer;
