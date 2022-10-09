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
