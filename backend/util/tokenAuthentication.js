import jwt from "jsonwebtoken";
import config from "../config";

export const createToken = (user) => {
  const tokenData = {
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const tokenOptions = {
    expiresIn: "12h",
  };
  return jwt.sign(tokenData, config.tokenSecret, tokenOptions);
};
export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const extractedToken = token.slice(7, token.length);
    jwt.verify(extractedToken, config.tokenSecret, (error, decode) => {
      if (error) {
        return res.status(401).send({ msg: "Invalid token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied" });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin token is not valid" });
};
