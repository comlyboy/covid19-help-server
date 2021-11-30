import express from "express";

import { AuthGuard } from "../middleware/auth.guard";

import { NewCase, GetCases, GetCasesByState, GetMetrics, GetCaseById, GetCaseByContact, DeleteCase, UpdateCase, UpdateCaseStatus } from "../controller/case.controller";

const router = express.Router();


router.post("/case", NewCase);

router.get("/case", AuthGuard, GetCases);

router.get("/case_by_state/:state", AuthGuard, GetCasesByState);

router.get("/case_metrics", AuthGuard, GetMetrics);

router.get("/case/:_id", AuthGuard, GetCaseById);

router.get("/case/verify/:phoneNumber", GetCaseByContact);

router.delete("/case/:_id", AuthGuard, DeleteCase);

router.put("/case/:_id", AuthGuard, UpdateCase);

router.put("/case_status/:_id", AuthGuard, UpdateCaseStatus);


export const CaseRoute = router;
