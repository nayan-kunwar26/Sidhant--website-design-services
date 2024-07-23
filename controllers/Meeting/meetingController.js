import createMeeting from "../../services/zoom/createZoomMeeting/createZoomMeeting.js";
import { asyncHandler } from "../../utils/errors/asyncHandler.js";
import ErrorResponse from "../../utils/errors/ErrorResponse.js";

export const createZoomMeeting = asyncHandler(async (req, res, next) => {
  const { topic } = req.body || "";
  const { duration } = req.body || 30;
  const { start_time } = req.body || new Date();

  try {
    const createdMeeting = await createMeeting(topic, duration, start_time);
    //console.log(`createdMeeting: ${createdMeeting}`);
    return res
      .status(200)
      .json({ msg: "Meeting created successfully", meeting: createdMeeting });
  } catch (err) {
    next(new ErrorResponse(err.message, 400));
  }
});
