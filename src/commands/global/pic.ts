import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import  ClientWithCommands  from '../../client'
import { DatabaseDriver } from "../../db/db_driver";

export default {
  data: new SlashCommandBuilder()
    .setName('pic')
    .setDescription('sends a picture of jobie'),
  async execute(client: ClientWithCommands, interaction: ChatInputCommandInteraction) {
    const rows: any[] = await DatabaseDriver.query_images(client.pool);
    if (rows == null) {
      await interaction.reply(`There was an issue with the database, please contact the bot owner`);
      return;
    }
    if (rows.length < 1) {
      await interaction.reply(`There are no images in the database! Try adding some with /add`);
      return;
    }

    const image = rows[Math.floor(Math.random() * rows.length)];
    await interaction.reply(`Here's a picture that my lovely wife took of me! ${image["image_link"]}`)
  },
};
