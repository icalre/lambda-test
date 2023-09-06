import { DataSource } from "typeorm";
import { CardSchema } from "../schema/card.schema";
import {loggerUtility} from "../../../utilities";
import * as dotenv from 'dotenv';

dotenv.config();

export const DatabaseProviders = new DataSource({
    type: "postgres",
    schema: process.env.POSTGRES_SCHEMA,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: ['error'],
    entities: [
      CardSchema
    ]
})
DatabaseProviders.initialize()
  .then(async () => {
    loggerUtility.info("Connection initialized with database...");
  })
  .catch((error) => loggerUtility.error(error));

export const getDataSource = (delay = 1000): Promise<DataSource> => {
  if (DatabaseProviders.isInitialized) return Promise.resolve(DatabaseProviders);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (DatabaseProviders.isInitialized) resolve(DatabaseProviders);
      else reject("Failed to create connection with database");
    }, delay);
  });
};
