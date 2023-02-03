import { ChatInputCommandInteraction, SlashCommandAttachmentOption, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('add a picture of jobie!')
    .addAttachmentOption(new SlashCommandAttachmentOption()
      .setRequired(true)
      .setName("image")
      .setDescription("send an image of jobie")),
  async execute(interaction: ChatInputCommandInteraction) {
    console.log(interaction.options.getAttachment("image").attachment);
    await interaction.reply('pingin!')
  },
};

