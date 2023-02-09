import axios from "axios";
import * as dotenv from "dotenv"
dotenv.config()


const api = axios.create({
    baseURL: "https://api.etherscan.io/",

})


async function findWalletBalance (billetera){

    const modulo = "account";
    const accion = "balance";
    const tag = "latest"
    const llave = process.env.ETHERKEY
    const data = await api.get(`api?module=${modulo}&action=${accion}&address=${billetera}&tag=${tag}&apikey=${llave}`)
    const resultado = data.data.result /(Math.pow(10, 18))
    return resultado
}

/* const balance = await findWalletBalance("0x7DC47f4C227e22DA6C81fCB4c253d1DC18BeC4A3") /(Math.pow(10, 18))
console.log(balance) */

export default findWalletBalance;





