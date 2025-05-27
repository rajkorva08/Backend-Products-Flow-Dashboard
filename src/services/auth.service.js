const AuthDAO = require("../daos/auth.dao");
const EnduserDao = require("../daos/enduser.dao");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/auth.utils");
const { v4: UUIDV4 } = require("uuid");

const registerUser = async (reqBody) => {
  console.log("=============reqBody: ", reqBody);
  const { name, email, password, role } = reqBody;
  const userExists = await AuthDAO.findUserByEmail(email);
  if (userExists) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);

  const userIdUUIDV4 = UUIDV4();
  if (role == "endUser") {
    const newUser = await EnduserDao.createEndUser({
      _id: userIdUUIDV4,
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber: reqBody.phoneNumber,
      createdBy: userIdUUIDV4,
      updatedBy: userIdUUIDV4,
    });
    return {
      message: "User registered successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  } else {
    const newUser = await AuthDAO.createUser({
      _id: userIdUUIDV4,
      name,
      email,
      password: hashedPassword,
      role,
      createdBy: userIdUUIDV4,
      updatedBy: userIdUUIDV4,
    });
    return {
      message: "User registered successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }
};

const loginUser = async (reqBody) => {
  const { email, password } = reqBody;
  const user = await AuthDAO.findUserByEmail(email);

  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = await generateToken(user.dataValues);

  return { message: "Login successful", user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
