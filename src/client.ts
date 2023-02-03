import { Client, ClientOptions, Collection } from "discord.js";

export default class ClientWithCommands extends Client {
  commands: Collection<String, any>;
  constructor(options: ClientOptions, commands: Collection<String, any>) {
    super(options);
    this.commands = commands;
  }
}

