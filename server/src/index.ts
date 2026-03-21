import "dotenv/config";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;

const app = Fastify({ logger: true });

await app.register(cors);

// Serve built client assets
const clientDist = path.join(__dirname, "../../client/dist");
await app.register(fastifyStatic, {
  root: clientDist,
  prefix: "/",
});

// SPA fallback — serve index.html for all non-file routes
app.setNotFoundHandler((_req, reply) => {
  reply.sendFile("index.html");
});

app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
