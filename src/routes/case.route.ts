import express from "express";

import authCheck from "../middleware/auth-check";

import { NewCase, GetCases, GetCasesByState, GetMetrics, GetCaseById, GetCaseByContact, DeleteCase, UpdateCase, UpdateCaseStatus } from "../controller/case.controller";

const router = express.Router();


router.post("/case", NewCase);

router.get("/case", authCheck, GetCases);

router.get("/case_by_state/:state", authCheck, GetCasesByState);

router.get("/case_metrics", authCheck, GetMetrics);

router.get("/case/:_id", authCheck, GetCaseById);

router.get("/case/verify/:phoneNumber", GetCaseByContact);

router.delete("/case/:_id", authCheck, DeleteCase);

router.put("/case/:_id", authCheck, UpdateCase);

router.put("/case_status/:_id", authCheck, UpdateCaseStatus);


export const CaseRoute = router;
