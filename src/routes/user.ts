// jwt is a token dependency for verifying user in middleware
// bcrypt prevent the password from saving as a plain text in d database
// 

//@ts-check

import express from 'express';
import User, { IUser, ISignup } from '../model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authCheck from '../middleware/auth-check';


const router = express.Router();



router.post("/user/signup", signupUser)
async function signupUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    const user_req_body: ISignup = req.body;
    try {
        const user = await User.findOne({ userName: req.body.userName }).exec();
        if (user) {
            return res.status(401).json({
                message: "Username already existing"
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const new_user_obj = new User({
            userName: user_req_body.userName,
            state: user_req_body.state,
            password: hash
        });

        const result = await new_user_obj.save();

        const totalUser = await User.countDocuments().exec();
        if (totalUser === 1) {
            await User.updateOne(
                { _id: result._id },
                {
                    $set: {
                        isAdmin: true
                    }
                }).exec()
        }
        res.status(201).json(result);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error
        });
    }

}


router.post('/user/login', loginUser)
async function loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const fetchedUser: IUser = await User.findOne({ userName: req.body.userName }).exec();
        if (!fetchedUser) {
            return res.status(401).json({
                message: 'Not a registered user'
            });
        }

        const hashResult = await bcrypt.compare(req.body.password, fetchedUser.password);
        if (!hashResult) {
            return res.status(401).json({
                message: "Invalid password!"
            });
        }

        const token = jwt.sign({
            userName: fetchedUser.userName,
            userId: fetchedUser._id
        },
            'is_a_secret_dont_tell_anybody'
        );


        res.status(200).json({
            token: token,
            user: {
                _id: fetchedUser._id,
                userName: fetchedUser.userName,
                state: fetchedUser.state,
                isAdmin: fetchedUser.isAdmin,
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong!"
        });
    }

}



router.put("/user/last_login/:_id", authCheck, userLastLogin);
async function userLastLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
    let lastLogin_date = Date.now()

    try {
        const result = await User.updateOne(
            {
                _id: req.params._id
            },
            {
                $set: {
                    lastLogin: lastLogin_date,
                }
            }).exec();

        res.status(201).json({
            message: "Successfully!",
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        });
    }

}

// Getting one user for editing and details pages
router.get("/user/:_id", authCheck, getUserProfile);
async function getUserProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
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
            message: "Something went wrong!"
        });
    }

}


export default router;