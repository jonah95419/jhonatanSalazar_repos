import { DataSource } from "typeorm";
import { URL } from "url";
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL!);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

/**
 *  Connection to cluster with TypeORM
 */
export const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: dbUrl.toString(),
  ssl: true,
  synchronize: true,
  migrationsRun: true,
  extra: {
    options: routingId
  },
  dropSchema: false,
  entities: [path.join(__dirname, "..", "entities", "**", "*.*"), path.join(__dirname, "..", "entities", "*.*")],
  migrations: [path.join(__dirname, "migrations", "*.*")],
});