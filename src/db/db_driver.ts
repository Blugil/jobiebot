import { Pool } from 'pg';

export class DatabaseDriver {

  static async query_images(pool: Pool): Promise<any[]> {
    const query = 'SELECT * FROM images;';
    const result = await pool.query(query);
    return result.rows;
  }

  static async add_image(pool: Pool, image_link: string): Promise<any[]> {
    const count_query = 'SELECT count(*) FROM images;';
    const query = 'INSERT INTO images(image_link, order_added) VALUES($1, $2) RETURNING image_link;'

    const count_response = await pool.query(count_query);
    const count: number = parseInt(count_response.rows[0]["count"]);

    const result = await pool.query(query, [image_link, count])
    return result.rows;
  }

  static async remove_image(pool: Pool): Promise<any[]> {
    const query = 'DELETE FROM images WHERE order_added = (SELECT MAX(order_added) FROM images);';
    const result = await pool.query(query);
    return result.rows;
  }
}
