import dotenv from "dotenv";
dotenv.config();
import { Options } from "graphql-yoga";
import app from "@src/app";
import { createConnection } from "typeorm";
import connectionOptions from "@src/ormConfig";
import decodeJWT from "./utils/decodeJWT";

const PORT: number | string | undefined = process.env.PORT;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams: any) => {
      const token = connectionParams["X-JWT"];
      if (token) {
        const user = await decodeJWT(token);
        if (user) {
          return {
            currentUser: user
          };
        }
      }
      throw new Error("Auth Error");
    }
  }
};

const handleAppStart = () => console.log(`Listening on port ${PORT}✅`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch(error => console.log(error));
