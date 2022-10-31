import { GuardianResponseItem, ModalData } from '../../types/types';

export interface CardItemProps {
  data: GuardianResponseItem;
  toggleModal: (newModalData: ModalData) => void;
}
