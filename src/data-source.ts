import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/user.entity";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST,
        port: process.env.PGPORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        // entities: ["src/entities/*.ts"],
        // migrations: ["src/migrations/*.ts"],
      
        // type: "postgres",
        // url: process.env.DATABASE_URL,
        // ssl:
        //   process.env.NODE_ENV === "production"
        //     ? { rejectUnauthorized: false }
        //     : false,
        // logging: true,
        // synchronize: false,

        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/src/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/src/migrations/*.js"]
            : ["src/migrations/*.ts"],

    }
);

export default AppDataSource;
