import express from "express";
import { createZoomMeeting, createZoomWebinar } from "../../controllers/zoom/zoom.js";

const router = express.Router();

router.route("/meeting").post(createZoomMeeting);
router.route("/webinar").post(createZoomWebinar); // webinar plan is missing

export default router;
