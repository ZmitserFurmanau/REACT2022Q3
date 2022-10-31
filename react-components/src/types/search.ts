import { GuardianResponseItem, ArticleData } from './types';

export interface SearchState {
  query: string;
  dataArr: GuardianResponseItem[] | [];
  sort: string;
  totalPages: number | null;
  currentPage: number;
  itemsPerPage: number;
  articleData: ArticleData | null;
}

export enum SearchActionTypes {
  SET_QUERY = 'SET_QUERY',
  SET_DATA = 'SET_DATA',
  SET_SORTING = 'SET_SORTING',
  SET_TOTAL_PAGES = 'SET_TOTAL_PAGES',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE',
  SET_ARTICLE_DATA = 'SET_ARTICLE_DATA',
}

interface SetQueryAction {
  type: SearchActionTypes.SET_QUERY;
  payload: string;
}

interface SetDataAction {
  type: SearchActionTypes.SET_DATA;
  payload: GuardianResponseItem[];
}

interface SetSortingAction {
  type: SearchActionTypes.SET_SORTING;
  payload: string;
}

interface SetTotalPagesAction {
  type: SearchActionTypes.SET_TOTAL_PAGES;
  payload: number;
}

interface SetCurrentPageAction {
  type: SearchActionTypes.SET_CURRENT_PAGE;
  payload: number;
}

interface SetItemsPerPageAction {
  type: SearchActionTypes.SET_ITEMS_PER_PAGE;
  payload: number;
}

interface SetArticleDataAction {
  type: SearchActionTypes.SET_ARTICLE_DATA;
  payload: ArticleData;
}

export type SearchAction =
  | SetQueryAction
  | SetDataAction
  | SetSortingAction
  | SetTotalPagesAction
  | SetCurrentPageAction
  | SetItemsPerPageAction
  | SetArticleDataAction;
