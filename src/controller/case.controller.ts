import express from "express";

import { Case } from "../model/case.schema";


import { generateId } from "../helper/unique-id";
import { ICase, NewCaseDto } from "../interface/case.interface";
import { CaseStatusEnum } from "../interface/common.interface";




export async function NewCase(req: express.Request, res: express.Response, next: express.NextFunction) {

    const { firstname, surname, phoneNumber, state, lga, dateOfBirth, address, symptoms }: NewCaseDto = req.body;
    const case_id = generateId(8);

    try {
        const new_case_obj = new Case({
            firstname,
            surname,
            phoneNumber,
            state,
            lga,
            dateOfBirth,
            address,
            symptoms,
            caseId: generateId(8),
        });

        const result = await new_case_obj.save();

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function GetCases(req: express.Request, res: express.Response, next: express.NextFunction) {
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
            message: error.message,
        });
    }
}

export async function GetCasesByState(req: express.Request, res: express.Response, next: express.NextFunction) {

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
            status: CaseStatusEnum.isNew,
        }).exec();

        const totalContacted = await Case.countDocuments({
            state: req.params.state,
            status: CaseStatusEnum.isContacted,
        }).exec();

        const totalConfirmed = await Case.countDocuments({
            state: req.params.state,
            status: CaseStatusEnum.isConfirmed,
        }).exec();

        const totalQuanrantined = await Case.countDocuments({
            state: req.params.state,
            status: CaseStatusEnum.isQuanrantined,
        }).exec();

        const totalNotSick = await Case.countDocuments({
            state: req.params.state,
            status: CaseStatusEnum.isNotSick,
        }).exec();

        const totalFake = await Case.countDocuments({
            state: req.params.state,
            status: CaseStatusEnum.isFake,
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
            message: error.message,
        });
    }
}




export async function GetMetrics(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const cases = await Case.find()
            .sort("registeredAt")
            .limit(6).exec();

        const totalCases = await Case.countDocuments();

        const totalNewCases = await Case.countDocuments({
            status: CaseStatusEnum.isNew,
        }).exec();

        const totalContacted = await Case.countDocuments({
            status: CaseStatusEnum.isContacted,
        }).exec();

        const totalConfirmed = await Case.countDocuments({
            status: CaseStatusEnum.isConfirmed,
        }).exec();

        const totalQuanrantined = await Case.countDocuments({
            status: CaseStatusEnum.isQuanrantined,
        }).exec();

        const totalNotSick = await Case.countDocuments({
            status: CaseStatusEnum.isNotSick,
        }).exec();

        const totalFake = await Case.countDocuments({
            status: CaseStatusEnum.isFake,
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
            message: error.message,
        });
    }
}



export async function GetCaseById(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const casse = await Case.findById({
            _id: req.params._id,
        });


        res.status(200).json(casse);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function GetCaseByContact(req: express.Request, res: express.Response, next: express.NextFunction) {

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
            message: error.message,
        });
    }
}



// Deleting a case
export async function DeleteCase(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        await Case.deleteOne({
            _id: req.params._id,
        });

        res.status(201).json({
            message: "Successfully!",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}


export async function UpdateCase(req: express.Request, res: express.Response, next: express.NextFunction) {

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
            message: error.message,
        });
    }
}


export async function UpdateCaseStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
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

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Updated successfully!" });
        } else {
            res.status(401).json({ message: "Not succesfull!" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
