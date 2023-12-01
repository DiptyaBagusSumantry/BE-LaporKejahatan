const jwt = require("jsonwebtoken");

function accesToken(req) {
  const accesToken = jwt.verify(
    req.cookies.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error) return res.sendStatus(403);
      return decoded;
    }
  );
  return accesToken;
}

module.exports = { accesToken };
