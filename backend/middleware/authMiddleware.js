import jwt from "jsonwebtoken";
import asyncHandle from "./asyncHandle.js";
import User from "../models/userModels.js";

const protect = asyncHandle(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      console.error(error);
      throw new Error("Not authorized, token verification failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { admin, protect };
