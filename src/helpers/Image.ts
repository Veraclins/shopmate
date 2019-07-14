import config from 'config';

export const getImageUrl = (image: string) => {
  if (!image) return '';
  return `${config.BASE_URL}/images/products/${image}`;
};
