import { asyncHandler } from "../../utils/errors/asyncHandler.js";
import ErrorResponse from "../../utils/errors/ErrorResponse.js";
import { createInvite } from "../../services/discord/discord.js";

export const createDiscordInvite = asyncHandler(async (req, res, next) => {
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
