import { ConnectionOptions } from "typeorm";
import User from "./entities/User"
import Place from "./entities/Place"
import PhoneVerification from "./entities/PhoneVerification"
import Message from "./entities/Message"
import Couple from "./entities/Couple"
import Chat from "./entities/Chat"

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: process.env.DB_NAME || "date-supporter-dev",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Place,
    PhoneVerification,
    Message,
    Couple,
    Chat
  ],
  host: process.env.DB_ENDPOINT || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "920204"
};

export default connectionOptions;
