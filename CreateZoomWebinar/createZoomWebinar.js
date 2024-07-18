import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
//console.log(`process.env.ZOOM_API_EMAIL: ${process.env.ZOOM_API_EMAIL}`);

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: process.env.ZOOM_CLIENT_ID,
    password: process.env.ZOOM_CLIENT_SECRET,
  },
};

const createZoomWebinar = async (topic, duration, start_time) => {
  try {
    let authResponse;
    await axios
      .request(config)
      .then((response) => {
        authResponse = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`\n--authResponse--: ${authResponse}`);

    const access_token = authResponse.access_token;
    console.log(`\n---access_token--: ${access_token}`);

    // Step 1: Get user ID
    const getUserUrl = `https://api.zoom.us/v2/users/${process.env.ZOOM_API_EMAIL}`;
    let userResponse;
    try {
      userResponse = await axios.get(getUserUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(
        `\nuserResponse: ${JSON.stringify(userResponse.data, null, 2)}`
      );
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response ? error.response.data : error.message
      );
      throw new Error(
        "Failed to fetch user details. Please check your API email and token."
      );
    }

    console.log(`\nuserResponse: ${userResponse}`);
    const userId = userResponse.data.id;
    console.log(`--userId--: ${userId}`);

    // Step 2: Create webinar
    const createWebinarUrl = `https://api.zoom.us/v2/users/${userId}/webinars`;
    const webinarData = {
      topic: topic,
      type: 5,
      start_time: start_time,
      duration: duration,
      timezone: "India",
      settings: {
        allow_multiple_devices: true,
        join_before_host: true,
        waiting_room: false,
        panelists_can_share: true,
        enable_qna: true,
        enable_waiting_room: true,
      },
    };

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    let createWebinarResponse;
    try {
      createWebinarResponse = await axios.post(createWebinarUrl, webinarData, {
        headers,
      });
      console.log(
        `\ncreateWebinarResponse: ${JSON.stringify(
          createWebinarResponse.data,
          null,
          2
        )}`
      );
    } catch (error) {
      console.error(
        "Error creating webinar:",
        error.response ? error.response.data : error.message
      );
      throw new Error(
        "Failed to create webinar. Please check your request parameters."
      );
    }

    console.log(`createWebinarResponse: ${createWebinarResponse}`);

    if (createWebinarResponse.status !== 201) {
      return "Unable to generate webinar link";
    }
    const response_data = createWebinarResponse.data;
    const content = {
      meeting_url: response_data.join_url,
      meetingTime: response_data.start_time,
      purpose: response_data.topic,
      duration: response_data.duration,
      message: "Success",
      status: 1,
    };
    return content;
  } catch (e) {
    return e;
  }
};

export default createZoomWebinar;
