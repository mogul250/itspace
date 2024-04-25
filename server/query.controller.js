import { database } from "./handler";

async function query(query) {
    try {
      const res = await new Promise((resolve, reject) => {
        database.query(query, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      });
      return JSON.parse(JSON.stringify(res));
    } catch (error) {
      console.error(error);
    }
}
const _query = query;
export { _query as query };