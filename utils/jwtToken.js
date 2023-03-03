const jwt = require('jsonwebtoken');
const { promisify } = require('util');

function createJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function createRefreshJwtToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
}

// i will never do that again  in my life again ever i swear on me me me

function generateTokens(id) {
  // variables are redefined inside function scope
  const jwtToken = createJwtToken(id);
  const refreshJwtToken = createRefreshJwtToken(id);

  return { jwtToken, refreshJwtToken };
}

async function decodeToken(token, secret) {
  let verify = promisify(jwt.verify);
  const decodedToken = await verify(token, secret);
  return decodedToken;
}

// in cookie we send jwt
module.exports = { generateTokens, decodeToken };
