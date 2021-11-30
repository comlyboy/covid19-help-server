// jwt is a token dependency for verifying user in middleware
// bcrypt prevent the password from saving as a plain text in d database

// @ts-check

import express from "express";
import { SignupUser, LoginUser, UserLastLogin, GetUserProfile } from "../controller/user.controller";

import { AuthGuard } from "../middleware/auth.guard";

const router = express.Router();


router.post("/user/signup", SignupUser)

router.post("/user/login", LoginUser)

router.put("/user/last_login/:_id", AuthGuard, UserLastLogin);

router.get("/user/:_id", AuthGuard, GetUserProfile);


export const UserRoute = router;
