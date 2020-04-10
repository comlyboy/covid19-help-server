import express from "express";

import authCheck from "../middleware/auth-check";
import Case, { ICase } from "../model/case";

import _ from "underscore";

import { generateId } from "../helper/unique-id";

const router = express.Router();

const definedStatus = {
    isNew: 1,
    isContacted: 2,
    isConfirmed: 3,
    isQuanrantined: 4,
    isNotSick: 5,
    isFake: 6,
};

router.post("/case", newCase);
async function newCase(req: express.Request, res: express.Response, next: express.NextFunction) {

    const case_req_body: ICase = req.body;
    const case_id = generateId(8);

    try {
        const new_case_obj = new Case({
            firstname: case_req_body.firstname,
            surname: case_req_body.surname,
            phoneNumber: case_req_body.phoneNumber,
            state: case_req_body.state,
            lga: case_req_body.lga,
            dateOfBirth: case_req_body.dateOfBirth,
            address: case_req_body.address,
            symptoms: case_req_body.symptoms,
            caseId: case_id,
        });

        const result = await new_case_obj.save();

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}



router.get("/case", authCheck, getCases);
async function getCases(req: express.Request, res: express.Response, next: express.NextFunction) {
    const casesPerPage = +req.query.pagesize;
    const currentPage = +req.query.page;

    const SearchQuery = req.query.search;
    let cases: ICase[];

    try {
        if (casesPerPage && currentPage) {
            cases = await Case.find()
                .sort("registeredAt")
                .skip(casesPerPage * (currentPage - 1))
                .limit(casesPerPage).exec();
        } else {
            cases = await Case.find()
                .sort("registeredAt").exec();
        }

        const totalCases = await Case.countDocuments().exec();

        res.status(200).json({
            cases: cases,
            totalCases: totalCases,
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}

router.get("/case_by_state/:state", authCheck, getStateCases);
async function getStateCases(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const cases = await Case.find({
            state: req.params.state,
        })
            .sort("registeredAt")
            .limit(6).exec();

        const totalCases = await Case.countDocuments({
            state: req.params.state,
        });

        const totalNewCases = await Case.countDocuments({
            state: req.params.state,
            status: definedStatus.isNew,
        }).exec();

        const totalContacted = await Case.countDocuments({
            state: req.params.state,
            status: definedStatus.isContacted,
        }).exec();

        const totalConfirmed = await Case.countDocuments({
            state: req.params.state,
            status: definedStatus.isConfirmed,
        }).exec();

        const totalQuanrantined = await Case.countDocuments({
            state: req.params.state,
            status: definedStatus.isQuanrantined,
        }).exec();

        const totalNotSick = await Case.countDocuments({
            state: req.params.state,
            status: definedStatus.isNotSick,
        }).exec();

        const totalFake = await Case.countDocuments({
            state: req.params.state,
            status: definedStatus.isFake,
        }).exec();

        res.status(200).json({
            cases: cases,
            totalCases: totalCases,
            totalNewCases: totalNewCases,
            totalContacted: totalContacted,
            totalConfirmed: totalConfirmed,
            totalQuanrantined: totalQuanrantined,
            totalNotSick: totalNotSick,
            totalFake: totalFake,
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}




router.get("/case_metrics", authCheck, getMetrics);
async function getMetrics(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const cases = await Case.find()
            .sort("registeredAt")
            .limit(6).exec();

        const totalCases = await Case.countDocuments();

        const totalNewCases = await Case.countDocuments({
            status: definedStatus.isNew,
        }).exec();

        const totalContacted = await Case.countDocuments({
            status: definedStatus.isContacted,
        }).exec();

        const totalConfirmed = await Case.countDocuments({
            status: definedStatus.isConfirmed,
        }).exec();

        const totalQuanrantined = await Case.countDocuments({
            status: definedStatus.isQuanrantined,
        }).exec();

        const totalNotSick = await Case.countDocuments({
            status: definedStatus.isNotSick,
        }).exec();

        const totalFake = await Case.countDocuments({
            status: definedStatus.isFake,
        }).exec();

        res.status(200).json({
            cases: cases,
            totalCases: totalCases,
            totalNewCases: totalNewCases,
            totalContacted: totalContacted,
            totalConfirmed: totalConfirmed,
            totalQuanrantined: totalQuanrantined,
            totalNotSick: totalNotSick,
            totalFake: totalFake,
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}

router.get("/case/:_id", authCheck, getCaseById);
async function getCaseById(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const casse = await Case.findById({
            _id: req.params._id,
        });


        res.status(200).json(casse);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}

router.get("/case/verify/:phoneNumber", getCaseByContact);
async function getCaseByContact(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const casse = await Case.findOne({
            phoneNumber: req.params.phoneNumber,
        });

        if (!casse) {
            return res.status(200).json(false);
        }
        res.status(200).json(true);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}



// Deleting a case
router.delete("/case/:_id", authCheck, deleteCase);
async function deleteCase(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        await Case.deleteOne({
            _id: req.params._id,
        });

        res.status(201).json({
            message: "Successfully!",
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}


router.put("/case/:_id", authCheck, updateCase);
async function updateCase(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        // const case = await Case.findOne({
        //     _id: req.params._id,
        // })

        // await User.updateOne(
        //     { _id: result._id },
        //     {
        //         $set: {
        //             isAdmin: true
        //         }
        //     }).exec()
        res.status(201).json({
            message: "Successfully!",
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}

router.put("/case_status/:_id", authCheck, updateCaseStatus);
async function updateCaseStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    const casse = req.body;
    try {
        const result = await Case.updateOne(
            {
                _id: req.params._id,
            },
            {
                $set: {
                    status: casse.status,
                },
            }).exec();

        if (result.nModified > 0) {
            res.status(200).json({ message: "Updated successfully!" });
        } else {
            res.status(401).json({ message: "Not succesfull!" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}

export default router;
