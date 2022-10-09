export interface CardData {
  id: string;
  title: string;
  ingredients: string;
  price: string;
  weight: string;
  ccal: string;
}

export interface FormRef {
  name: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  postindex: React.RefObject<HTMLInputElement>;
}

export interface FormData {
  name: string;
  date: string;
  postindex: string;
}
