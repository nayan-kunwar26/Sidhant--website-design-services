import express from "express";
import { createZoomMeeting } from "../../controllers/Meeting/meetingController.js";

const router = express.Router();

router.route("/create").post(createZoomMeeting);

export default router;
