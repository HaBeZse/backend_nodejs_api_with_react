import express from "express";
import { UserRoutes } from "./routes/user.routes.ts";
import { MainRoutes } from "./routes/main.routes.ts";

const app = express();
app.use(express.json());
app.use("/v1", MainRoutes.router);
app.use("/v1/user", UserRoutes.router);

const PORT_NUM = 3000;

app.listen(PORT_NUM, () => {
  console.log(`Hey, go to localhost:${PORT_NUM}`);
});
