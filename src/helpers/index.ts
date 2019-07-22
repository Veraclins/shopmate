import config from 'config';

export const getImageUrl = (image: string) => {
  if (!image) return '';
  return `${config.BASE_URL}/images/products/${image}`;
};

export const getColorAndSize = (attributes: string) => {
  const [size, color] = attributes.split(', ');
  return { size, color };
};

interface Data {
  [key: string]: any;
}

export const checkRequiredFields = (data: Data, requiredField: string[]) => {
  let errors = '';
  let number = 0;
  const input = {};

  // Removes empty spaces
  Object.entries(data).forEach(([key, value]) => {
    input[key] = value.toString().trim();
  });
  // Checks that all fields are present
  requiredField.forEach(element => {
    if (!input[element] || input[element].length <= 0) {
      errors += `${element}, `;
      number++;
    }
  });
  if (errors) {
    errors = `${errors.substring(0, errors.length - 2)} ${
      number > 1 ? 'are' : 'is'
    } required`;
  }
  return errors;
};
