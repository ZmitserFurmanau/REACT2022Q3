import { GuardianResponseItem, ModalData } from '../../types/types';

export interface CardListProps {
  dataArr: GuardianResponseItem[];
  toggleModal: (newModalData: ModalData) => void;
}
