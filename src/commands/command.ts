import { SlashCommandBuilder }  from "discord.js";

export interface SlashCommand {
  data: SlashCommandBuilder,
  execute(): Promise<void>
}




