import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import  ClientWithCommands  from '../../client'
import { DatabaseDriver } from "../../db/db_driver";

export default {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('removes the most recent pic! in case you added the wrong one'),
  async execute(client: ClientWithCommands, interaction: ChatInputCommandInteraction) {
    const rows: any[] = await DatabaseDriver.remove_image(client.pool);
    console.log(rows);
    if (rows.length < 1) {
      await interaction.reply(`There are no images in the database! Try adding some with /add`);
      return;
    }
    await interaction.reply(`you've successfully removed the image!`)
  },
};
