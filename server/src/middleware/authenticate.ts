import express from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = async (
  req: any,
  res: express.Response,
  next: any
) => {
  const headers = req.headers.authorization;

  if (headers) {
    const token = headers.split(" ")[0];

    const user = await jwt.verify(token, process.env.SECRET);
    if (!user) {
      return res.status(403).send("Unauthorized");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).send("Unauthorized...");
  }

  return res.status(500).send("Internal Server Error");
};
