import ClientWithCommands from '../client';

export default (client: ClientWithCommands): void => {
  client.on("messageCreate", async (message) => {
    if (message.content.includes('odie') || message.content.includes('jobie')) {
      message.react(process.env.EMOJI);
    }
  });
}
