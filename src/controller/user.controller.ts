import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";

import { SERVER_SECRET_KEY } from "../configuration/configuration";
import { UserSignUpDto } from "../interface/user.interface";

import { User } from "../model/user.schema";


const router = express.Router();


export async function SignupUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    const { userName, state, password }: UserSignUpDto = req.body;
    try {
        const user = await User.findOne({ userName: req.body.userName }).exec();
        if (user) {
            return res.status(401).json({
                message: "Username already existing",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const new_user_obj = new User({
            userName,
            state,
            password: hash
        });

        const result = await new_user_obj.save();

        const totalUser = await User.countDocuments().exec();
        if (totalUser === 1) {
            await User.updateOne(
                { _id: result._id },
                {
                    $set: {
                        isAdmin: true,
                    },
                }).exec()
        }
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}


export async function LoginUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const fetchedUser = await User.findOne({ userName: req.body.userName }).exec();
        if (!fetchedUser) {
            return res.status(404).json({
                message: "Not a registered user",
            });
        }

        const hashResult = await bcrypt.compare(req.body.password, fetchedUser.password);
        if (!hashResult) {
            return res.status(400).json({
                message: "Invalid password!",
            });
        }

        const token = jwt.sign({
            userName: fetchedUser.userName,
            userId: fetchedUser._id,
        }, SERVER_SECRET_KEY, { expiresIn: `30m` });


        res.status(200).json({
            token: token,
            user: {
                _id: fetchedUser._id,
                userName: fetchedUser.userName,
                state: fetchedUser.state,
                isAdmin: fetchedUser.isAdmin,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}



export async function UserLastLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
    let lastLogin_date = Date.now()

    try {
        const result = await User.updateOne(
            {
                _id: req.params._id,
            },
            {
                $set: {
                    lastLogin: lastLogin_date,
                },
            }).exec();

        res.status(201).json({
            message: "Successfully!",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}


export async function GetUserProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const user = await User.findById({
            _id: req.params._id,
        }, { password: false }).exec();

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User does not exist!" });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}

export const UserRoute = router;
