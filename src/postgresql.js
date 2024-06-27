import {pool} from "./database/connectionPostgreSQL.js";

const getLanguajes = async ()=>{
    try {
        const result = await pool.query("SELECT idCliente FROM cliente;");
        console.log(result);
    } catch (error) {
        console.error(error);
        
    }
};

getLanguajes();