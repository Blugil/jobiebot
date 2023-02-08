import { REST, Routes, Client, ClientOptions, Collection } from "discord.js";
import { Client as Database_Client } from 'pg';

import { SlashCommand } from "./commands/command";

export default class ClientWithCommands extends Client {
  commands: Collection<string, any>;
  db_client: Database_Client;
  constructor(options: ClientOptions, commands: Collection<string, any>, db_client: Database_Client) {
    super(options);
    this.commands = commands;
    this.db_client = db_client;
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

  async connect_database() {
    try {
      await this.db_client.connect();
      await this.db_client.query("SELECT NOW()");
      console.log("successfully connected to db");
    } catch (err) {
      console.error("error executing query:", err);
    } finally {
      this.db_client.end();
    }
  }
}


