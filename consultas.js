export default class Timestamp {
    constructor(){
        const fecha = new Date()
        this.day= fecha.getDate(),
        this.month = fecha.getMonth() + 1,
        this.year = fecha.getFullYear()
    }
}

/* const dia = fecha.getDate()
const mes = fecha.getMonth() + 1
const year = fecha.getFullYear()
console.log(dia +"/" + mes + "/" +year) */
