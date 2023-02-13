import koa from "koa"
import {koaBody} from "koa-body";
import koaRouter from "./koaRoutes.js";
import serve from "koa-static";

const app = new koa()

app.use(serve("public"))
app.use(koaBody())
app.use(koaRouter.routes())
app.listen(8083)