import express from "express";
import { createZoomWebinar } from "../../controllers/webinar/webinarController.js";

const router = express.Router();

router.route("/create").post(createZoomWebinar);

export default router;
