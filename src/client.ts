import { REST, Routes, Client, ClientOptions, Collection } from "discord.js";
import { Pool } from 'pg';

import { SlashCommand } from "./commands/command";

export default class ClientWithCommands extends Client {
  commands: Collection<string, any>;
  pool: Pool;
  constructor(options: ClientOptions, pool: Pool) {
    super(options);
    this.pool = pool;

    this.commands = new Collection<string, any>();
  }

  async attach_commands(client_id: string, token: string) {
    const command_payload = [];
    this.commands.forEach((value: SlashCommand, _: string) => {
      command_payload.push(value.data.toJSON());
    });
    const rest = new REST({ version: '10' }).setToken(token);

    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationCommands(client_id), { body: command_payload });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  async connect_pool() {
    try {
      const client = await this.pool.connect()
      await client.query('SELECT NOW()')
      client.release()
      console.log("successfully connected to db");
    } catch (err) {
      console.error("error executing query:", err);
    }   
  }
}


