import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pings the bot to ensure its online and working!'),
  async execute(interaction: ChatInputCommandInteraction){
    await interaction.reply('im pingin!')
  },
};

