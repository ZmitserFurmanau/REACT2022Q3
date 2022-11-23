export const mockValidFormCard = () => {
  return {
    name: 'Dzmirty',
    date: '2022-10-10',
    delivery: 'selfexport',
    time: 'evening',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    agree: true,
  };
};

export const mockInvalidFormCard = () => {
  return [
    {
      name: '11',
      date: '2021-01-01',
      delivery: 'default',
      time: 'evening',
      image: '',
      agree: true,
    },
    {
      name: 'ww',
      date: '',
      delivery: 'default',
      time: 'day',
      image: '',
      agree: false,
    },
    {
      name: '',
      date: '2022-05-05',
      delivery: 'default',
      time: 'evening',
      image: '',
      agree: true,
    },
  ];
};
