import { Collection, GatewayIntentBits, REST, Routes } from 'discord.js'

import interactionCreate from './listeners/interactionCreate'
import ready from './listeners/ready'
import ClientWithCommands from './client'
import Ping from './commands/global/ping'
import Add from './commands/global/add'

import 'dotenv/config'

const token = process.env.TOKEN || process.env.DEV_TOKEN
const client_id = process.env.CLIENT_ID || process.env.DEV_CLIENT_ID

const command_payload = [];
const commands = new Collection<string, any>();

const client = new ClientWithCommands({intents: [GatewayIntentBits.Guilds]}, commands);
client.commands.set(Ping.data.name, Ping);
client.commands.set(Add.data.name, Add);

// converts the commands to a JSON payload to register with the discord api
const commands_iterator = client.commands[Symbol.iterator]();
for (const command of commands_iterator) {
  command_payload.push(command[1].data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(client_id), { body: command_payload });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

ready(client);
interactionCreate(client);
client.login(token);
