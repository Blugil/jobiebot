import { Pool } from 'pg';

export class DatabaseDriver {

  static async query_images(pool: Pool): Promise<Array<any>> {
    const query = 'SELECT * FROM images;'
    let rv: Array<any> = null;
    await pool.query(query).then((res) => {
      rv = res.rows;
    }).catch((err) => {
      console.error(err);
    });
    return rv;
  }

  static async add_image(pool: Pool, image_link: string) {
    const query = 'INSERT INTO images(image_link) VALUES($1);'
    await pool.query(query, [image_link]).then(res => {
        return res;
    }).catch(e => console.error(e));
  }
}
