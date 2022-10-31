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
    case FormActionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case FormActionTypes.SET_DATE:
      return { ...state, date: action.payload };
    case FormActionTypes.SET_DELIVERY:
      return { ...state, delivery: action.payload };
    case FormActionTypes.SET_TIME:
      return { ...state, time: action.payload };
    case FormActionTypes.SET_IMAGE:
      return { ...state, image: action.payload };
    case FormActionTypes.SET_AGREE:
      return { ...state, agree: action.payload };
    case FormActionTypes.SET_FORM_STATES_ARR:
      return { ...state, formStatesArr: action.payload };
    default:
      return state;
  }
};
