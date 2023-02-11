import { ChatInputCommandInteraction, SlashCommandAttachmentOption, SlashCommandBuilder } from "discord.js";
import  ClientWithCommands  from '../../client'
import { DatabaseDriver } from "../../db/db_driver";

export default {
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDescription('sends three pictures of jobie!'),
  async execute(client: ClientWithCommands, interaction: ChatInputCommandInteraction) {
    let rows: Array<any> = await DatabaseDriver.query_images(client.pool);
    let images = [];
    if (rows == null) {
      await interaction.reply(`There was an issue with the database, please contact the bot owner`);
      return;
    }
    if (rows.length >=3) {
      for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * rows.length);
        images.push(rows[index]);
        rows.splice(index,1);
      }
      await interaction.reply(`Here are THREE whole pictures that my lovely wife took of me! ${images[0]} ${images[1]} ${images[2]}`)
      return;
    }
    
    await interaction.reply("There aren't even three images yet! Try just getting one picture or adding some more before requesting some spam!")
    
  },
};
