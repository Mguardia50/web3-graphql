import Router from "koa-router";
import send from "koa-send";
import findWalletBalance from "./etherscan.js";
import Timestamp from "./consultas.js";

const router = new Router();
let persistencia = [];


router.get("/", async (ctx) => {

await send(ctx, '/public/index.html')
})

router.post("/", async (ctx) => {
    const req = ctx.request.body;
    const wallet = req.cryptoBalance;
    const result = await findWalletBalance(wallet);
    const timestamp = new Timestamp();
    const consultado = {
        wallet: wallet,
        balance: result,
        timestamp: timestamp
    }
    persistencia.push(consultado)
    ctx.body = (consultado)
    })

router.get("/consulta", async (ctx) => {
        let resultadosConsultados = [];
        const fecha = ctx.query
        const day = fecha.date.slice(8,10)
        const month = fecha.date.slice(5,7)
        const year = fecha.date.slice(0,4)
        persistencia.forEach(consulta =>{
            if(consulta.timestamp.day == day && consulta.timestamp.month == month && consulta.timestamp.year == year){
                resultadosConsultados.push(consulta);
            }

        })
        ctx.body = (
            resultadosConsultados
        )
        })


export default router;