import React from 'react';
import { render, screen } from '@testing-library/react';

import CardItemModal from './CardItemModal';
import { mockGuardianResponse } from '../../tests/mockGuardianResponse';

describe('Card item modal', () => {
  let modal: HTMLElement;
  const testData = mockGuardianResponse().response.results[0];
  const { webPublicationDate } = testData;
  const { body, thumbnail, standfirst, shortUrl } = testData.fields;
  beforeEach(() => {
    render(
      <CardItemModal
        body={body}
        thumbnail={thumbnail}
        standfirst={standfirst}
        shortUrl={shortUrl}
        webPublicationDate={webPublicationDate}
      />
    );
    modal = screen.getByTestId('card-item-modal');
  });

  it('should render component', async () => {
    expect(modal).toBeInTheDocument();
  });

  it('should render props correctly', async () => {
    expect(modal).toContainHTML(body);
    expect(modal).toContainHTML(thumbnail);
    expect(modal).toContainHTML(standfirst);
    expect(modal).toContainHTML(shortUrl);
  });
});
