const validateName = (name) => {
  const regexName = /[a-zA-Z0-9]+/;
  const minLength = 6;
  return (regexName.test(name) && name.length >= minLength);
};

const validateEmail = (email) => {
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]{0,2})?$/;
  return regexEmail.test(email.toLowerCase());
};

const validatePassword = (password) => {
  const regexPassword = /[a-zA-Z0-9]+/;
  const minLength = 6;
  return (regexPassword.test(password) && password.length >= minLength);
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};
