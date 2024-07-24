import express from "express";
import { createDiscordInvite } from "../../controllers/discord/discord.js";

const router = express.Router();

router.route("/invite").get(createDiscordInvite);

export default router;
