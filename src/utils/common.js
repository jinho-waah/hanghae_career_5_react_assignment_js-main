export const pick = (obj, ...propNames) => {
  const result = {};

  propNames.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    } else {
      throw new Error(
        `Property "${String(key)}" does not exist on the object.`
      );
    }
  });

  return result;
};

export const debounce = (fn, wait) => {
  let timeout = null;

  return (...args) => {
    const later = () => {
      timeout = -1;
      fn(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};

export const isNumber = (value) => typeof value === 'number';

export const parseJSON = (value) => {
  if (!value) {
    return value;
  }

  const result = JSON.parse(value);

  return typeof result === 'string' ? JSON.parse(result) : result;
};
