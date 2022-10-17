import { GuardianResponseItem, ModalData } from '../../utils/types';

export interface CardItemProps {
  data: GuardianResponseItem;
  toggleModal: (newModalData: ModalData) => void;
}
