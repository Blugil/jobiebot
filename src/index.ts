import { GatewayIntentBits, } from 'discord.js'
import { Pool } from 'pg';

import interactionCreate from './listeners/interactionCreate'
import ready from './listeners/ready'
import message from './listeners/emoji_react'
import ClientWithCommands from './client'

// command imports
import Ping from './commands/global/ping'
import Add from './commands/global/add'
import Pic from './commands/global/pic'
import Spam from './commands/global/spam'
import Remove from './commands/global/remove'

import 'dotenv/config'
// import { SlashCommand } from './commands/command'

// gathers environment variables
const token = process.env.TOKEN || process.env.DEV_TOKEN
const client_id = process.env.CLIENT_ID || process.env.DEV_CLIENT_ID

// instances the database client
// const database_client = new DatabaseClient(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL 
});

const client = new ClientWithCommands(
  {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
  }, 
  pool
);

client.commands.set(Ping.data.name, Ping);
client.commands.set(Add.data.name, Add);
client.commands.set(Pic.data.name, Pic);
client.commands.set(Spam.data.name, Spam);
client.commands.set(Remove.data.name, Remove);

client.attach_commands(client_id, token);
client.connect_database();

ready(client);
interactionCreate(client);
message(client);
client.login(token);
