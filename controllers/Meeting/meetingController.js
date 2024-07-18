import createMeeting from "../../CreateZoomMeeting/createZoomMeeting.js";

export const createZoomMeeting = async (req, res) => {
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
    return res.status(400).json({ msg: err.message });
  }
};
