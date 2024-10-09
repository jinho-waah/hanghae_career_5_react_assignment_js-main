export const isFirebaseIndexError = (error) => {
  return (
    error.includes('The query requires an index') &&
    error.includes('https://console.firebase.google.com')
  );
};

export const extractIndexLink = (errorMessage) => {
  const match = errorMessage.match(
    /https:\/\/console\.firebase\.google\.com[^\s]+/
  );
  return match ? match[0] : null;
};
