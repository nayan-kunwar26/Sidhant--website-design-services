import { asyncHandler } from "../../utils/errors/asyncHandler.js";
import ErrorResponse from "../../utils/errors/ErrorResponse.js";
import { createInvite, listGuildMembers } from "../../services/discord/discord.js";

export const createGuildInvite = asyncHandler(async (req, res, next) => {
  const guildId = process.env.DISCORD_GUILD_ID;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  if (!guildId || !channelId)
    next(new ErrorResponse("guildId and channelId are required", 400));

  try {
    const inviteLink = await createInvite(guildId, channelId);
    res.status(200).json({ inviteLink });
  } catch (error) {
    next(new ErrorResponse("Failed to create invite link", 500));
  }
});

export const getGuildMembers = asyncHandler(async (req, res, next) => {
  const { guildId } = req.params; 
  if (!guildId) {
    return next(new ErrorResponse("guildId is required", 400));
  }

 
  const members = await listGuildMembers(guildId);
  if (!members) next(new ErrorResponse("Failed to fetch guild members", 500));
  
  res.status(200).json({ members });
});
