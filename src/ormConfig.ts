import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: process.env.DB_NAME || "date_supporter",
  synchronize: true,
  logging: false,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};
// || "date_supporter"

export default connectionOptions;
