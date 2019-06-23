import { ApolloServer } from "apollo-server";
import { generateSchema } from "./utils/generateSchema";
import { createConnection, getConnectionOptions } from "typeorm";

const { NODE_ENV } = process.env;

export async function startApp() {
  const server = new ApolloServer({
    schema: generateSchema()
  });

  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    entities: NODE_ENV === "production" ? ["dist/modules/**/entity.js"] : connectionOptions.entities
  });

  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀  Server ready at ${url}`);
}
