import express from "express";
import { SETTINGS } from "./core/settings/settings";
import { runDB } from "./db/mongo.db";
import { setupApp } from "./super-app";

const bootstrap = async () => {
  const app = express();
  setupApp(app);
  const PORT = SETTINGS.PORT;

  await runDB(SETTINGS.MONGO_URL);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  return app;
};

bootstrap();
