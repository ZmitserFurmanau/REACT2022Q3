import React from 'react';
import { render, screen } from '@testing-library/react';

import FormCardItem from './FormCardItem';
import { mockValidFormCard } from '../../tests/mockFormCard';

describe('Form card item', () => {
  let item: HTMLElement;
  const mockProps = mockValidFormCard();

  const setup = () => {
    render(<FormCardItem key={0} index={0} {...mockProps} />);
    item = screen.getByRole('listitem');
  };

  it('should render component', async () => {
    setup();
    expect(item).toBeInTheDocument();
  });

  it('should render props correctly', async () => {
    setup();
    expect(item).toContainHTML(mockProps.name);
    expect(item).toContainHTML(mockProps.date);
    expect(item).toContainHTML(mockProps.delivery);
    expect(item).toContainHTML(mockProps.time);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(item).toContainHTML(mockProps.image);
    expect(screen.getByText(/I agree to the processing of personal data/i)).toBeInTheDocument();
  });
});
