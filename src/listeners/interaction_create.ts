import  ClientWithCommands  from '../client'


export default (client: ClientWithCommands): void => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error("no commmand matching");
      return;
    }

    try {
      await command.execute(client, interaction);
    }
    catch(err) {
      console.error(err);
      await interaction.reply({content: "there was an error while executing this command", ephemeral: true});
    }
  });
}
