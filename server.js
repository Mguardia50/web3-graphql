import express  from "express";
import {graphqlHTTP} from "express-graphql";
import { buildSchema } from "graphql";
import findWalletBalance from "./etherscan.js";
import Timestamp from "./consultas.js";


const app = express()


const schema = buildSchema(`type Wallet {
    number: String,
    balance: Float,
    }

    type timestamp {
        day: Int,
        month: Int,
        year: Int
    }

    type consultas {

    number: String,
    balance: Float,
    timestamp: timestamp
    }
    
    input fecha {
        day: Int,
        month: Int,
        year: Int
    }
    
    type Query {
        getBalance(number: String!): Wallet
        getConsultas: [consultas]
    }
    
    type Mutation {
    ConsultarFecha(data: fecha): [consultas]
    
    }
    `)

    let consultas = [];
    
    const getConsultas = () => consultas;

    const getBalance = async ({number})=>{
        const bala = await findWalletBalance(number);
        let fecha = new Timestamp();
        const consulta = {number: number, balance: bala, timestamp: {day: fecha.day, month: fecha.month, year: fecha.year}}
        consultas.push(consulta)
        return{
            number: number,
            balance: bala
        }
    }

    const ConsultarFecha = ({data}) =>{
        let consultaPorFecha = []
        consultas.forEach(consulta => {
            if (data.day == consulta.timestamp.day && data.month == consulta.timestamp.month && data.year == consulta.timestamp.year){
                consultaPorFecha.push(consulta)
            }
        })
        return consultaPorFecha
    } 


app.use("/", graphqlHTTP({
schema,
//resolvers
rootValue:{
    getBalance,
    getConsultas,
    ConsultarFecha
},
graphiql: true,
}))




app.listen(8080, () => console.log("iniciando"))
