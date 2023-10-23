// bcryptPasswordUtils.js

const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds (adjust as needed)

// Function to hash a password
async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash.toString();
  } catch (error) {
    throw error;
  }
}

// Function to verify a password against a stored hash
async function comparePassword(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
