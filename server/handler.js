import express from 'express';
import bodyParser from 'body-parser';
import { createPool } from 'mysql';
let app = express();
import path from 'path';
import dotenv from "dotenv";
dotenv.config();
let connection =  createPool({
	host : 'itspace-2.c9mqeoiy66rs.eu-north-1.rds.amazonaws.com',
	// host : 'localhost',
	user : 'itspace',
	// user : 'root',
	password : 'itspace250',
	// password : '',
	database : 'itspace',
	// database : 'itzone',
});
connection.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }

    console.log('Successfully connected to database with threadId:', connection.threadId);
});
const server = app.listen(process.env.PORT ,()=>{
	console.log("app was connected to port: ",process.env.PORT);
})
import session from 'express-session';
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET 
}));
const _server = server;
export { _server as server };
const _app = app;
export { _app as app };
export const database = connection;
