import { Component } from 'react';

import { GuardianResponse } from '../utils/types';

const endpointUrl = 'https://content.guardianapis.com/search';
const apiKey = process.env.REACT_APP_API_KEY;

export default class GuardianService extends Component {
  static async getData(query: string, page = 1): Promise<GuardianResponse> {
    const response: Response = await fetch(
      `${endpointUrl}?q=${query}&show-fields=all&api-key=${apiKey}&page-size=20&page=${page}`
    );
    const data: GuardianResponse = await response.json();
    return data;
  }
}
