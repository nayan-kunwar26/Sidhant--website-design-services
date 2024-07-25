import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

export const initializeDiscordBot = () => {
  // Runs whenever a message is sent
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    // message.reply({ content: "Hello From Bot" });
    // Checks if the message says "hello"
    if (message.content === "hello") {
      // Sending custom message to the channel
      message.channel.send("Hello Geeks!!");
    }
  });

  client.login(process.env.DISCORD_BOT_TOKEN);

  client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Fetch all guilds the bot is a part of
    const guilds = client.guilds.cache.map((guild) => guild);

    guilds.forEach((guild) => {
      console.log(`Guild ID: ${guild.id}, Guild Name: ${guild.name}`);
    });

    // Example: Get the first guild ID
    const firstGuildId = guilds[0].id;
    console.log(`First Guild ID: ${firstGuildId}`);
  });
};

export const createInvite = async (guildId, channelId) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    const channel = guild.channels.cache.get(channelId);
    console.log(`guild: ${guild}`);
    console.log(`channel: ${channel}`);
    if (!channel) {
      throw new Error("Channel not found");
    }

    const invite = await channel.createInvite({
      maxAge: 86400, // 1 day
      maxUses: 1, // 10 uses
    });

    return invite.url;
  } catch (error) {
    console.error("Error creating Discord invite:", error);
    throw error;
  }
};

export const listGuildMembers = async (guildId) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    await guild.members.fetch(); // Fetch all members in the guild

    return guild.members.cache.map(member => ({
      id: member.id,
      username: member.user.username,
      discriminator: member.user.discriminator,
      status: member.presence ? member.presence.status : 'offline'
    }));
  } catch (error) {
    console.error('Error fetching guild members:', error);
    throw error;
  }
};