import { environment } from "./environment/environment";
import * as mysql from 'mysql';
let dbConnection:mysql.Connection;


export const db = {
    connect: ():Promise<void>=>{
        const {host,user,password,port,database} = environment.db;
        const connection:mysql.Connection = mysql.createConnection({host,user,password,port,database});
        return new Promise((resolve,reject)=>{
            connection.connect((err:mysql.MysqlError)=>{
                if(err){
                    reject(err);
                }else{
                    dbConnection = connection;
                    resolve();
                }
            });
        });
    },

    getDBConnection: ():mysql.Connection=>{
        if(dbConnection===undefined){
            throw new Error("Not connected to database");
        }
        return dbConnection;
    }
}