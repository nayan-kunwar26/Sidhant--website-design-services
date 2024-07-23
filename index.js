import dotenv from "dotenv";
import express from "express";
import zoomRoutes from "./routes/meetingRoutes/meetingRoutes.js";

const app = express();

app.use(express.json({ extended: false }));

//Routes
app.use("/api/v1/zoom/", zoomRoutes);

dotenv.config();
app.get("/", (req, res) => {
  res.send("Server up and running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
