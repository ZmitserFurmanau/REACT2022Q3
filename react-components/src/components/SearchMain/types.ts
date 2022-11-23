import { GuardianResponseItem, ModalData } from '../../utils/types';

export interface SearchMainState {
  query: string;
  dataArr: GuardianResponseItem[];
  isLoading: boolean;
  isError: boolean;
  isModalActive: boolean;
  modalData: ModalData | null;
}
