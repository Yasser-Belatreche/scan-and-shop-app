import { Client, Pool } from "pg";

const pool: Pool = new Pool();

pool.on("error", (err, client) => {
  throw new Error(
    `Unexpected error on idle client (database didn't connect): ${err}`
  );
});

const db = {
  query: (query: string, params?: (number | string | undefined)[]) =>
    pool.query(query, params),
  getClient: () => pool.connect(),
};

export { db };
