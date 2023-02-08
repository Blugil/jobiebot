import { Collection, GatewayIntentBits, } from 'discord.js'
import { Client as Database_Client} from 'pg';

import interactionCreate from './listeners/interactionCreate'
import ready from './listeners/ready'
import message from './listeners/emoji_react'
import ClientWithCommands from './client'
import Ping from './commands/global/ping'
import Add from './commands/global/add'

import 'dotenv/config'
// import { SlashCommand } from './commands/command'

const token = process.env.TOKEN || process.env.DEV_TOKEN
const client_id = process.env.CLIENT_ID || process.env.DEV_CLIENT_ID

const commands = new Collection<string, any>();
const database_client = new Database_Client(process.env.DATABASE_URL);

const client = new ClientWithCommands(
  {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
  }, 
  commands,
  database_client
);

client.commands.set(Ping.data.name, Ping);
client.commands.set(Add.data.name, Add);

client.attach_commands(client_id, token);
client.connect_database();

ready(client);
interactionCreate(client);
message(client);
client.login(token);
