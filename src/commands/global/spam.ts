import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import  ClientWithCommands  from '../../client'
import { DatabaseDriver } from "../../db/db_driver";

export default {
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDescription('sends three pictures of jobie!'),
  async execute(client: ClientWithCommands, interaction: ChatInputCommandInteraction) {
    let rows: any[] = await DatabaseDriver.query_images(client.pool);
    let images = [];

    if (rows.length < 1) {
      await interaction.reply(`There are no images in the database! Try adding some with /add`);
      return;
    }
    if (rows.length < 3) {
      await interaction.reply("There aren't even three images yet! Try just getting one picture or adding some more before requesting some spam!")
      return;
    }

    for (let i = 0; i < 3; i++) {
      let index = Math.floor(Math.random() * rows.length);
      images.push(rows[index]["image_link"]);
      rows.splice(index,1);
    }
    await interaction.reply(`Here are THREE whole pictures that my lovely wife took of me! ${images[0]} ${images[1]} ${images[2]}`)

  },
};
