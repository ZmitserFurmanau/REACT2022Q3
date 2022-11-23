import React from 'react';
import { render, screen, within } from '@testing-library/react';

import FormCardList from './FormCardList';
import { mockValidFormCard } from '../../tests/mockFormCard';
import { FormData } from '../../types/types';

describe('Form card list', () => {
  const simgleRequest = mockValidFormCard() as FormData;
  const multipleRequest = new Array(3).fill(simgleRequest) as FormData[];
  let list: HTMLElement;
  let statesArr: FormData[] = [simgleRequest];

  const setup = () => {
    render(<FormCardList statesArr={statesArr} />);
    list = screen.getByTestId('form-card-list');
  };

  it('should render component', async () => {
    setup();
    expect(list).toBeInTheDocument();
  });

  it('should render correct number of items', async () => {
    statesArr = multipleRequest;
    setup();
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(statesArr.length);
  });
});
