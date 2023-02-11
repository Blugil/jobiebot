import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import ClientWithCommands from "../../client";

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pings the bot to ensure its online and working!'),
  async execute(client: ClientWithCommands, interaction: ChatInputCommandInteraction){
    await interaction.reply('im pingin!')
  },
};

