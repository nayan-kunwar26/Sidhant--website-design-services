import dotenv from "dotenv";
import express from "express";
import zoomRoutes from "./routes/zoom/meetingRoutes.js";
import { initializeDiscordBot } from "./services/discord/discord.js";
import discordRotes from "./routes/discord/discordRoutes.js"
const app = express();

dotenv.config();

app.use(express.json({ extended: false }));

initializeDiscordBot(); 

//Routes
app.use("/api/v1/zoom/", zoomRoutes);
app.use("/api/v1/discord", discordRotes);


app.get("/", (req, res) => {
  res.send("Server up and running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
