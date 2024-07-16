import dotenv from "dotenv";
import express from "express";
import meetingController from "./controllers/meetingController.js"

const app = express();


app.use(express.json({ extended: false }));

app.use("/api/meeting/", meetingController);

dotenv.config();
app.get("/", (req, res) => {
  res.send("Server up and running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
