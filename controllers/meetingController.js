import express from "express";
import createZoomMeeting from "../CreateZoomMeeting/createZoomMeeting.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "Api is working!" });
});

router.post("/", async (req, res) => {
  const { topic } = req.body || "";
  const { duration } = req.body || 30;
  const { start_time } = req.body || new Date();

  try {
    const createdMeeting = await createZoomMeeting(topic, duration, start_time);
    console.log(`createdMeeting: ${createdMeeting}`);
    return res
      .status(200)
      .json({ msg: "Meeting created successfully", meeting: createdMeeting });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

export default router;
