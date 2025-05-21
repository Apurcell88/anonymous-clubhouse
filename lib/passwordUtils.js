const bcrypt = require("bcrypt");

const genPassword = async (password) => {
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);
  return { hash };
};

const validPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  genPassword,
  validPassword,
};
