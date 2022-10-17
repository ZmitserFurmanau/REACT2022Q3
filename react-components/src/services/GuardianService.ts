import { Component } from 'react';
import axios from 'axios';

import { GuardianResponse } from '../utils/types';

const endpointUrl = 'https://content.guardianapis.com/search';
const apiKey = process.env.REACT_APP_API_KEY;

export default class GuardianService extends Component {
  static async getData(query: string, page = 1): Promise<GuardianResponse> {
    try {
      const response = await axios.get(
        `${endpointUrl}?q=${query}&show-fields=all&api-key=${apiKey}&page-size=20&page=${page}&order-by=newest`
      );
      const data: GuardianResponse = response.data;
      return data;
    } catch {
      throw new Error('Something went wrong');
    }
  }
}
