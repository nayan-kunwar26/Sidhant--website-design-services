import express from "express";
import { createGuildInvite, getGuildMembers } from "../../controllers/discord/discord.js";

const router = express.Router();

router.route("/guilds/invite").get(createGuildInvite);
router.route("/guilds/:guildId/members").get(getGuildMembers);

export default router;
