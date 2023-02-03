import { Client, ClientOptions, Collection } from "discord.js";

export default class ClientWithCommands extends Client {
  commands: Collection<string, any>;
  constructor(options: ClientOptions, commands: Collection<string, any>) {
    super(options);
    this.commands = commands;
  }
}

