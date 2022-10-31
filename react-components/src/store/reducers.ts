import { FormAction, FormActionTypes, FormState } from '../types/form';
import { SearchAction, SearchActionTypes, SearchState } from '../types/search';

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case FormActionTypes.SET_COUNTER:
      return { ...state, testCounter: action.payload };
    default:
      return state;
  }
};

export const searchReducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case SearchActionTypes.SET_QUERY:
      return { ...state, query: action.payload };
    case SearchActionTypes.SET_DATA:
      return { ...state, dataArr: action.payload };
    default:
      return state;
  }
};
