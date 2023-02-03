import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('responds with pinging!'),
  async execute(interaction) {
    await interaction.reply('pingin!')
  },
};

