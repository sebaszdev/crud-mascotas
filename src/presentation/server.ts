import express from "express";
import { router } from "./routes";
import { prisma } from "../../prisma/prisma";

const app = express();
const port = Number(process.env.PORT) || 3000;

export const start = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  app.use(router);

  // simple healthcheck
  app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));


  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Error interno" });
  });


  const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });


  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, closing server...`);

    server.close(async () => {
      console.log("Server closed, disconnecting prisma");
      try {
        await prisma.$disconnect();
        console.log("Prisma client disconnected");
      } catch (err) {
        console.error("Error disconnecting prisma client:", err);
      }
      process.exit(0);
    });

  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

export { app };
