import express from "express";
import { ServerRouter } from "./routes/server.routes.js";
const app = express();
app.use(express.json());
app.use('/v1', ServerRouter.router);
const PORT_NUM = 3000;
app.listen(PORT_NUM, () => {
    console.log(`Hey, go to localhost:${PORT_NUM}`);
});
//# sourceMappingURL=server.js.map