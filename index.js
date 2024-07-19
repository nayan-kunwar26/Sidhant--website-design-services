import dotenv from "dotenv";
import express from "express";
import meetingRoutes from "./routes/meetingRoutes/meetingRoutes.js";
import webinarRoutes from "./controllers/webinar/webinarConroller.js";

const app = express();

app.use(express.json({ extended: false }));

//Routes
app.use("/api/meeting", meetingRoutes);
app.use("/api/webinar", webinarRoutes);

dotenv.config();
app.get("/", (req, res) => {
  res.send("Server up and running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
