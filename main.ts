import { MongoClient } from "mongodb"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL) Deno.exit(1)

const client = new MongoClient(MONGO_URL)
await client.connect()
console.log("Conectado a la base de datos")

const db = client.db("agenda")
const ContactCollection = db.collection("contact")

const server = new ApolloServer({typeDefs, resolvers})

const { url } = await startStandaloneServer(server,{
  context: async() => ({ ContactCollection })
})

console.log(`🚀  Server ready at: ${url}`);