import { app } from "./app.js";
import dbConnection from "./db/db.connection.js";

const PORT = process.env.PORT || 9000;

const startServer = async () => {
  try {
    await dbConnection();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("Server stopped");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      server.close(() => {
        console.log("Server stopped");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
};

startServer();