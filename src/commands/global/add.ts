import { ChatInputCommandInteraction, SlashCommandAttachmentOption, SlashCommandBuilder } from "discord.js";
import  ClientWithCommands  from '../../client'
import { DatabaseDriver } from "../../db/db_driver";

export default {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('add a picture of jobie!')
    .addAttachmentOption(new SlashCommandAttachmentOption()
      .setRequired(true)
      .setName("image")
      .setDescription("send an image of jobie")),
  async execute(client: ClientWithCommands, interaction: ChatInputCommandInteraction) {
    const image_link: string = interaction.options.getAttachment("image").attachment.toString()
    const rows = await DatabaseDriver.add_image(client.pool, image_link);
    if (rows.length < 1) {
      await interaction.reply(`There was a problem and the iamge was not added to the database`);
      return;
    }
    await interaction.reply(`This image has been added to the database! ${rows[0]["image_link"]}`)
  },
};

