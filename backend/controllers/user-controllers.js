import User from "../models/userModel";
import { createToken } from "../util/tokenAuthentication";

export const createAdmin = async (req, res, next) => {
  try {
    const admin = new User({
      name: "Anis Alkomem",
      email: "anis@anis.com",
      password: "12345",
      isAdmin: true,
    });
    const newAdmin = await admin.save();
    res.send(newAdmin);
  } catch (error) {
    res.send({ msg: error.message });
  }
};
export const userSignin = async (req, res, next) => {
  const currentUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (currentUser) {
    res.send({
      _id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
      token: createToken(currentUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid email and/or password" });
  }
};
export const userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: createToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid user data" });
  }
};
