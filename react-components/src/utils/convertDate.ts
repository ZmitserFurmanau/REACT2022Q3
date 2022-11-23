export const convertDate = (str: string) => {
  const dateObj = new Date(str);
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleDateString(undefined, { month: 'long' });
  const day = dateObj.getDate();
  const time = dateObj.toLocaleTimeString();
  return `${day} ${month} ${year}, ${time}`;
};
