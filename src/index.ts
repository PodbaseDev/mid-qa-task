import { startServer } from "./api";
import { connectDatabase } from "./database";

(() => {
  startServer();
  connectDatabase();
})();
