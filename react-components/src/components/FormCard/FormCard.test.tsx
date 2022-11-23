import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormCard from './FormCard';
import { mockInvalidFormCard, mockValidFormCard } from '../../tests/mockFormCard';

describe('Form card item', () => {
  let form: HTMLElement;
  let name: HTMLInputElement;
  let date: HTMLInputElement;
  let delivery: HTMLSelectElement;
  let image: HTMLInputElement;
  let agree: HTMLInputElement;
  let modal: HTMLElement | null;
  let button: HTMLElement;
  const mockInvalid = mockInvalidFormCard();
  const mockValid = mockValidFormCard();

  const setup = () => {
    const mock = jest.fn();
    render(<FormCard setFormState={mock} />);
    form = screen.getByTestId('form-card');
    name = screen.getByRole('textbox', { name: /name:/i });
    date = screen.getByTestId('date-input');
    delivery = screen.getByRole('combobox');
    image = screen.getByTestId('file-input');
    agree = screen.getByTestId('agree-checkbox');
    modal = screen.queryByText(/order successfully created!/i);
    button = screen.getByRole('button', { name: /place the order/i });
  };

  it('should render component', async () => {
    setup();
    expect(form).toBeInTheDocument();
  });

  it("shouldn't submit invalid form", async () => {
    setup();
    let data = mockInvalid[0];
    userEvent.type(name, data.name);
    userEvent.type(date, data.date);
    userEvent.selectOptions(delivery, data.delivery);
    userEvent.upload(image, new File([data.image], 'example.png'));
    userEvent.click(button);
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });

    data = mockInvalid[1];
    name.value = '';
    userEvent.type(name, data.name);
    userEvent.clear(date);
    userEvent.selectOptions(delivery, data.delivery);
    userEvent.upload(image, new File([data.image], 'example.png'));
    userEvent.click(agree);
    userEvent.click(button);
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });

    data = mockInvalid[2];
    userEvent.clear(name);
    userEvent.type(date, data.date);
    userEvent.selectOptions(delivery, data.delivery);
    userEvent.upload(image, new File([data.image], 'example.png'));
    userEvent.click(agree);
    userEvent.click(button);
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });

  it('should submit valid form', async () => {
    setup();
    const data = mockValid;
    userEvent.type(name, data.name);
    userEvent.type(date, data.date);
    userEvent.selectOptions(delivery, data.delivery);
    userEvent.upload(image, new File([data.image], 'example.png'));
    expect(image.files).toHaveLength(1);
    userEvent.click(agree);
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/order successfully created!/i)).toBeInTheDocument();
    });
  });
});
