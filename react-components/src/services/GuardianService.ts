import axios from 'axios';

import { GuardianResponse } from '../types/types';

const endpointUrl = 'https://content.guardianapis.com/search';
const apiKey = process.env.REACT_APP_API_KEY;

export const getData = async (query: string, page = 1): Promise<GuardianResponse> => {
  try {
    const response = await axios.get(
      `${endpointUrl}?q=${query}&show-fields=all&api-key=${apiKey}&page-size=20&page=${page}&order-by=newest`
    );
    const data: GuardianResponse = response.data;
    return data;
  } catch {
    throw new Error('Something went wrong');
  }
};
