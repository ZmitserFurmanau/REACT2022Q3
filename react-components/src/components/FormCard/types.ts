import { FormData } from '../../types/types';

export interface FormProps {
  setFormState: (state: FormData) => void;
}

export interface FormState {
  errorsArr: string[];
  isButtonDisabled: boolean;
  isModalActive: boolean;
}
