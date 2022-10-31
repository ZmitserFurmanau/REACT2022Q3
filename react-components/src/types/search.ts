import { GuardianResponseItem } from './types';

export interface SearchState {
  query: string;
  dataArr: GuardianResponseItem[] | [];
}

export enum SearchActionTypes {
  SET_QUERY = 'SET_QUERY',
  SET_DATA = 'SET_DATA',
}

interface SetQueryAction {
  type: SearchActionTypes.SET_QUERY;
  payload: string;
}

interface SetDataAction {
  type: SearchActionTypes.SET_DATA;
  payload: GuardianResponseItem[];
}

export type SearchAction = SetQueryAction | SetDataAction;
