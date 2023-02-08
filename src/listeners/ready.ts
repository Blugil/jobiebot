import  ClientWithCommands  from '../client'


export default (client: ClientWithCommands): void => {
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
}
