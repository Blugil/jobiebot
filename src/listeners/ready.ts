import  { Client } from 'discord.js'


export default (client: Client): void => {
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
}
