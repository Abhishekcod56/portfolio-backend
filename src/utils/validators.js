const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const isRequired = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    value !== ""
  );
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 6
  );
};

module.exports = {
  isValidEmail,
  isRequired,
  isValidUrl,
  isValidPassword
};
