import express from "express";

import authCheck from "../middleware/auth-check";
import Case, { ICase } from "../model/case";

import _ from "underscore";

// import data from "./data/nigeria_states_lgas.json"

import { generateId } from "../helper/unique-id";

const router = express.Router();



router.get("/state", getStatesLGA);
async function getStatesLGA(req: express.Request, res: express.Response, next: express.NextFunction) {



    try {


    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}
