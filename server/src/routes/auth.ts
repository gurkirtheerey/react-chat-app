import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { authenticateJWT } from "../middleware/authenticate";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const router = express.Router({ mergeParams: true });

// register route
router.post(
  "/register",
  body("email").isEmail(),
  body("username").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),
  async (req: express.Request, res: express.Response) => {
    // validate user input and send 400 if bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send(
          "Minimum Character Length (username, password): 5. Email must be valid"
        );
    }

    // get required data from request
    const { email, username, password } = req.body;

    // check if this users email or username already exists
    try {
      const userExists = await User.find({ $or: [{ email }, { username }] });
      // send status 400 if email exists in db
      if (userExists && userExists.length > 0) {
        return res
          .status(400)
          .send("A user with this email or username already exists...");
      }

      // hash user password before saving in db
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // REMEMBER TO CHANGE THIS HASH
        // save user to db
        const user = new User({
          email,
          username,
          password: hashedPassword,
          avatar: "https://react-chatter-api.herokuapp.com/images/po.png",
        });
        try {
          const saveUser: any = await user.save();
          const token = await jwt.sign({ user }, process.env.SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).json({
            userId: saveUser._id,
            username,
            token,
            avatar: saveUser.avatar,
          });
        } catch (err) {
          console.log(err);
          return res
            .status(500)
            .send("Internal Server Error -- saving user to db");
        }
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .send("Internal Server Error -- hashing user password");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  }
);

// login route
router.post(
  "/login",
  body("username").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),
  async (req: express.Request, res: express.Response) => {
    // validate user input and send 400 if bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get required data from request
    const { username, password } = req.body;

    // check if this users email or username already exists
    try {
      const userExists: any = await User.findOne({ username });
      // send status 400 if email exists in db
      if (!userExists) {
        return res
          .status(400)
          .send("Could not find a user with that username/password combo");
      }

      // hash user password before saving in db
      try {
        const hashedPassword = await bcrypt.compare(
          password,
          userExists.password
        );

        // if user exists
        if (hashedPassword) {
          try {
            const token = await jwt.sign(
              { user: userExists },
              process.env.SECRET,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              userId: userExists._id,
              username: userExists.username,
              token,
              avatar: "https://react-chatter-api.herokuapp.com/images/po.png",
            });
          } catch (err) {
            console.log(err);
            return res
              .status(500)
              .send(
                "Internal Server Error -- setting token for logged in user"
              );
          }
        } else {
          return res
            .status(400)
            .send(
              "Could not find a user with that username/password combo -- second"
            );
        }
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .send("Internal Server Error -- comparing user passwords");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/verify", authenticateJWT, (req: any, res: any) => {
  const { user } = req.user;
  res.status(200).send(user);
});

router.get("/test", (req: any, res: any) => {
  try {
    res.sendFile(path.join(__dirname, "../../public/images/po.png"));
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
