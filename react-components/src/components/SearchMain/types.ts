import { GuardianResponseItem } from '../../utils/types';

export interface SearchMainState {
  query: string;
  dataArr: GuardianResponseItem[];
  isLoading: boolean;
}
