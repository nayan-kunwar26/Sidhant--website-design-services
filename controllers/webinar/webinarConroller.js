import express from "express";
import createZoomWebinar from "../../CreateZoomWebinar/createZoomWebinar.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { topic } = req.body || "";
  const { duration } = req.body || 30;
  const { start_time } = req.body || new Date();

  console.log(`Webinar Topic: ${topic}`);
  console.log(`Webinar Duration: ${duration}`);
  console.log(`Webinar Start Time: ${start_time}`);

  try {
    const createdWebinar = await createZoomWebinar(topic, duration, start_time);
    console.log(`\ncreatedWebinar: ${createdWebinar}`);
    return res
      .status(200)
      .json({ msg: "Webinar created successfully", meeting: createdWebinar });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

export default router;
