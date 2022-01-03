const getRandomPassword: () => string = () => {
  let password: string;
  do {
    password = Math.round(Math.random() * 10 ** 8).toString();
  } while (password.length < 8);

  return password;
};

export { getRandomPassword };
