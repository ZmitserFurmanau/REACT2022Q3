import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileInput from './FileInput';

describe('File input', () => {
  let input: HTMLInputElement;
  let errorsArr: string[] = [];

  const setup = () => {
    const mock = jest.fn();
    const ref = { current: {} } as React.RefObject<HTMLInputElement>;
    render(<FileInput forwardRef={ref} errorsArr={errorsArr} errReset={mock} />);
    input = screen.getByTestId('file-input');
  };

  it('should render component', async () => {
    setup();
    expect(input).toBeInTheDocument();
  });

  it('should input focus', async () => {
    setup();
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it('should upload file', async () => {
    setup();
    const fakeFile = new File(['test'], 'test.png', { type: 'image/png' });
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(input, fakeFile);
      });
    });
    const result = input.files as FileList;
    expect(result[0]).toStrictEqual(fakeFile);
  });

  it('should show required message', async () => {
    errorsArr = ['image'];
    setup();
    expect(screen.getByText(/this field cannot be empty/i)).toBeInTheDocument();
  });
});
