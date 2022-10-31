import { GuardianResponseItem } from './types';

export interface SearchState {
  query: string;
  dataArr: GuardianResponseItem[] | [];
  sort: string;
}

export enum SearchActionTypes {
  SET_QUERY = 'SET_QUERY',
  SET_DATA = 'SET_DATA',
  SET_SORTING = 'SET_SORTING',
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

export type SearchAction = SetQueryAction | SetDataAction | SetSortingAction;
