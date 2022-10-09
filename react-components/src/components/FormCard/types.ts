import { FormData } from '../../utils/types';

export interface FormProps {
  setFormState: (state: FormData) => void;
}

export interface FormState {
  errorsArr: string[];
}
