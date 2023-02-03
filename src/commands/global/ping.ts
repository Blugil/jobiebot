import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('responds with pinging!'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('pingin!')
  },
};

