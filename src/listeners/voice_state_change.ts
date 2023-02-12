import ClientWithCommands from '../client';
import { DatabaseListenerDriver } from '../db/db_listener';

export default (client: ClientWithCommands): void => {
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if (!(oldState.guild.id == process.env.GUILD_ID)) {
      return;
    }

    let current_member_count: number = 0;
    let channel_id: string = "";
    let channel_name: string = "";

    if (oldState.channel) {
      current_member_count = oldState.channel.members.size;
      channel_id = oldState.channel.id;
      channel_id = oldState.channel.name;

    }
    if (newState.channel) {
      current_member_count = newState.channel.members.size;
      channel_id = newState.channel.id;
      channel_id = newState.channel.name;
    }

    current_member_count = 2;

    if (current_member_count == 2) {
      await DatabaseListenerDriver.upsert_voice_session(client.pool, channel_id, channel_name, true);
    }
    else if (current_member_count < 1) {
      let current_time = new Date();

      const response = await DatabaseListenerDriver.get_voice_session(client.pool, channel_id);
      const voice_session = response[0];
      const call_start_date = new Date(parseInt(voice_session["start_date"]));

      const call_length = current_time.getTime() - call_start_date.getTime();

      if (call_length > parseInt(voice_session["call_record"])) {
        await DatabaseListenerDriver.update_call_record(client.pool, channel_id, call_length.toString());
      }

      await DatabaseListenerDriver.set_voice_inactive(client.pool, channel_id);

      console.log(call_length)

    }

    console.log(current_member_count);
  });
}
