import * as express from "express";
import { MainRouter } from "./routers/MainRouter";
import { AssetsRouter } from "./routers/AssetsRouter";

let PORT = process.env.PORT || 3000;
let app: express.Application = express();

app.use("/assets", AssetsRouter)
    .use("/", MainRouter)
    .listen(PORT, () => {
        console.log(`App Server Ready. Listening to ${PORT}`);
    });
