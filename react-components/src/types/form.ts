import { FormData } from './types';

export interface FormState {
  name: string;
  date: string;
  delivery: string;
  time: string;
  image: string;
  agree: string;
  formStatesArr: FormData[] | [];
}

export enum FormActionTypes {
  SET_NAME = 'SET_NAME',
  SET_DATE = 'SET_DATE',
  SET_DELIVERY = 'SET_DELIVERY',
  SET_TIME = 'SET_TIME',
  SET_IMAGE = 'SET_IMAGE',
  SET_AGREE = 'SET_AGREE',
  SET_FORM_STATES_ARR = 'SET_FORM_STATES_ARR',
}

interface SetNameAction {
  type: FormActionTypes.SET_NAME;
  payload: string;
}

interface SetDateAction {
  type: FormActionTypes.SET_DATE;
  payload: string;
}

interface SetDeliveryAction {
  type: FormActionTypes.SET_DELIVERY;
  payload: string;
}

interface SetTimeAction {
  type: FormActionTypes.SET_TIME;
  payload: string;
}

interface SetImageAction {
  type: FormActionTypes.SET_IMAGE;
  payload: string;
}

interface SetAgreeAction {
  type: FormActionTypes.SET_AGREE;
  payload: string;
}

interface SetFormStatesArr {
  type: FormActionTypes.SET_FORM_STATES_ARR;
  payload: FormData[];
}

export type FormAction =
  | SetNameAction
  | SetDateAction
  | SetDeliveryAction
  | SetTimeAction
  | SetImageAction
  | SetAgreeAction
  | SetFormStatesArr;
