export const isValidPassword = (value: string): Boolean => {
  // TODO decide on password validation regex
  const lowercaseValue = value.toLowerCase();

  if (value.length < 8) return false;
  if (lowercaseValue === value) return false;

  return true;
};
