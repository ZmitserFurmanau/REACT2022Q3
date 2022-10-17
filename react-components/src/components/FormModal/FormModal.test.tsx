import React from 'react';
import { render, screen } from '@testing-library/react';

import FormModal from './FormModal';

describe('FormModal', () => {
  let modal: HTMLElement | null;
  let isActive = true;
  const setup = () => {
    const mock = jest.fn();
    render(<FormModal isActive={isActive} toggleModalActive={mock} />);
    modal = screen.queryByText(/order successfully created!/i);
  };

  it('should render component', async () => {
    setup();
    expect(modal).toBeInTheDocument();
  });

  it("shouldn't render component while inactive", async () => {
    isActive = false;
    setup();
    expect(modal).not.toBeInTheDocument();
  });
});
