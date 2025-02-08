import jwt from 'jsonwebtoken'; 


const generateTokens = (id, email) => {
  const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error("JWT secrets are not defined");
  }

  const accessToken = jwt.sign(
    { id, email },
    accessTokenSecret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '2h' }
  );

  const refreshToken = jwt.sign(
    { id,email },
    refreshTokenSecret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;
