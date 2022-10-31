export interface FormState {
  testCounter: number;
}

export enum FormActionTypes {
  SET_COUNTER = 'SET_COUNTER',
}

interface SetCounterAction {
  type: FormActionTypes.SET_COUNTER;
  payload: number;
}

export type FormAction = SetCounterAction;
