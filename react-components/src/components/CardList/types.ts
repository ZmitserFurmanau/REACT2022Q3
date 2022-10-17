import { GuardianResponseItem, ModalData } from '../../utils/types';

export interface CardListProps {
  dataArr: GuardianResponseItem[];
  toggleModal: (newModalData: ModalData) => void;
}
