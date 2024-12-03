import express from "expres"
import mysql from "mysql2"
import cors from "cors"

const app = express ();
// middleWare 
 app.use(cors());
 app.use(express.json());

 //mysql connection

 const connection =mysql.createConnection({
    host:"localhost ",
    user:"root",
    password:"risper",
    database:"practice"
 })
 //connection to the database
 connection.connect((err)=>{
    if (err){
        console.error("error connecting to mysql:", err.message);
        process.exit(1)
    }
    console.log("connected to mysql")
 })

