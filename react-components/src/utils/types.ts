export interface CardData {
  id: string;
  title: string;
  ingredients: string;
  price: string;
  weight: string;
  ccal: string;
}

export interface FormRef {
  common: React.RefObject<HTMLFormElement>;
  name: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  delivery: React.RefObject<HTMLSelectElement>;
  time: React.RefObject<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;
  agree: React.RefObject<HTMLInputElement>;
}

export interface FormData {
  name: string;
  date: string;
  delivery: string;
  time: string;
  image: string | null;
  agree: boolean;
}

export enum FormFieldTypes {
  NAME = 'name',
  DATE = 'date',
  DELIVERY = 'delivery',
  TIME = 'time',
  IMAGE = 'image',
  AGREE = 'agree',
}

export enum ErrorTypes {
  NAME_REQUIRED = 'name',
  NAME_SHORT = 'name:short',
  NAME_INVALID = 'name:invalid',
  DATE_REQUIRED = 'date',
  DATE_INVALID = 'date:invalid',
  DELIVERY_REQUIRED = 'delivery',
  IMAGE_REQUIRED = 'image',
  AGREE_REQUIRED = 'agree',
}

export enum ErrorMessages {
  NAME_REQUIRED = 'This field cannot be empty',
  NAME_SHORT = 'This field cannot be less than 3 characters',
  NAME_INVALID = 'The field contains invalid characters or numbers',
  DATE_REQUIRED = 'This field cannot be empty',
  DATE_INVALID = 'Necessary specify a date in the future',
  DELIVERY_REQUIRED = 'This field cannot be empty',
  IMAGE_REQUIRED = 'This field cannot be empty',
  AGREE_REQUIRED = 'Necessary to agree to the processing of personal data',
}
