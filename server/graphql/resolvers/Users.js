const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");

const { User } = require("../../models/User");

module.exports = {
  Query: {
    async getUsers() {
      const users = await User.find({})
        .select("_id username email posts")
        .populate("posts")
        .exec();

      return users;
    },
  },
  Mutation: {
    // Register
    async register(_, { input: { username, password, password1, email } }) {
      // check duplicate username and email
      const dupUsername = await User.findOne({ username });
      if (dupUsername)
        throw new UserInputError(`Username is already taken`, {
          errors: {
            username: "Username is already taken",
          },
        });

      const dupEmail = await User.findOne({ email });
      if (dupEmail)
        throw new UserInputError(`Email is already taken`, {
          errors: {
            email: "Email is already taken",
          },
        });

      // check passwords
      if (password !== password1)
        throw new UserInputError(`Passwords do not match`, {
          errors: {
            password: "Passwords do not match",
          },
        });

      // hash password
      password = await bcrypt.hash(password, 10);

      const user = await User.create({ username, password, email });

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // Login
    async login(_, { username, password }) {
      // check if user is existing
      const user = await User.findOne({ username });
      if (!user)
        throw new UserInputError(`User not found`, {
          errors: {
            username: "User not found",
          },
        });

      // check if password is correct
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        throw new UserInputError(`Invalid Credentials`, {
          errors: {
            password: "Invalid Credentials",
          },
        });

      // generate token and set cookie
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      };
    },

    verify(_, { token }) {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      return verified ? true : false;
    },
    async updateUser(_, { input: userData }) {
      // TODO: hash password if changed

      if (userData.newPassword !== undefined) {
        const hashedPassword = await bcrypt.hash(userData.newPassword, 10);
        userData.password = hashedPassword;
      }

      const userExist = await User.findByIdAndUpdate(userData.id, userData, {
        new: true,
        runValidators: true,
      });

      if (!userExist)
        throw new UserInputError(`Cannot Update User`, {
          errors: {
            deleteUser: "Cannot Update User",
          },
        });

      return {
        ...userExist._doc,
      };
    },
    async deleteUser(_, { id }) {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser)
        throw new UserInputError(`Cannot Delete User`, {
          errors: {
            deleteUser: "Cannot Delete User",
          },
        });

      return {
        ...deletedUser._doc,
      };
    },
  },
};
