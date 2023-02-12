import { Pool } from 'pg';

export class DatabaseListenerDriver {

  static async upsert_voice_session(pool: Pool, 
                                    channel_id: string, 
                                    channel_name: string, 
                                    active: boolean): Promise<any[]> {
    const query = `INSERT INTO voice_sessions (channel_id, channel_name, start_date, active, call_record) 
                   VALUES ($1, $2, $3, $4, $5) 
                   ON CONFLICT(channel_id) DO 
                   UPDATE SET start_date = $3, active = $4 WHERE channel_id = $1;`

    let response = await pool.query(query, [channel_id, channel_name, Date.now().toString(), active, "0"]);
    return response.rows;
  }

  static async get_voice_session(pool: Pool, channel_id: string): Promise<any[]>{
    const query = "SELECT * FROM voice_sessions WHERE channel_id = $1;"
    let response = await pool.query(query, [channel_id]);
    return response.rows;
  }

  static async update_call_record(pool: Pool, channel_id: string, call_record: string): Promise<any[]> {
    const query = "UPDATE voice_sessions SET call_record = $1 WHERE channel_id = $2;"
    let response = await pool.query(query, [call_record, channel_id]);
    return response.rows;
  }

  static async set_voice_inactive(pool: Pool, channel_id: string) {
    const query = "UPDATE voice_sessions SET active = $2 WHERE id = $1"
    let response = await pool.query(query, [channel_id, false]);
    return response.rows;

  }
}
