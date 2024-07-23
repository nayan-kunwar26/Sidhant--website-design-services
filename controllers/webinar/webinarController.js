import createWebinar from "../../services/zoom/createZoomWebinar/createZoomWebinar.js";
import { asyncHandler } from "../../utils/errors/asyncHandler.js";
import ErrorResponse from "../../utils/errors/ErrorResponse.js";

export const createZoomWebinar = asyncHandler(async (req, res, next) => {
  const { topic } = req.body || "";
  const { duration } = req.body || 30;
  const { start_time } = req.body || new Date();

  console.log(`Webinar Topic: ${topic}`);
  console.log(`Webinar Duration: ${duration}`);
  console.log(`Webinar Start Time: ${start_time}`);

  try {
    const createdWebinar = await createWebinar(topic, duration, start_time);
    console.log(`\ncreatedWebinar: ${createdWebinar}`);
    return res
      .status(200)
      .json({ msg: "Webinar created successfully", meeting: createdWebinar });
  } catch (err) {
    next(new ErrorResponse(err.message, 400));
  }
});
