import ganache from "ganache";
import Web3 from "web3";

const web3Ver = "4x"
const web3 = new Web3(ganache.provider(), null, { transactionConfirmationBlocks: 1 });

const billeteraDePrueba = "0x7DC47f4C227e22DA6C81fCB4c253d1DC18BeC4A3";

function crearCuenta(entropia) {
    if (web3Ver == "4x") { entropia =""} //en la v4x no se puede poner este parámetro
    const account = web3.eth.accounts.create(entropia)
    console.log(account)
    return account
}

function creatBilletera (entropia){
    if (web3Ver == "4x") { entropia =""}
    const wallet = web3.eth.accounts.wallet.create(entropia);
    console.log(wallet)
    return wallet
}

async function obtenerBalance(billetera){
    const balance = await web3.eth.getBalance(billetera)
    console.log(balance)
    return balance
}



const options = {};
const provider = ganache.provider(options);

//get accounts por proveedor
const accounts = await provider.request({ method: "eth_accounts", params: [] });

//get accounts por web3
const accountsOtroMetodo = await web3.eth.getAccounts()

//accounts.forEach(billetera => obtenerBalance(billetera))
obtenerBalance(billeteraDePrueba)
//console.log(gasPrice);