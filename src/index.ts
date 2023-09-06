import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import Logger from './providers/Logger'
import morganMiddleware from './middlewares/Morgan'
import {Database} from './providers/Database'
import Locals from "./providers/Locals";
// Importing Routes
import routes from './routes/index'
dotenv.config()
const app = express();

Database.init()
// Configure Express to use EJS
app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({ limit: '3mb', extended: true }));
app.use(morganMiddleware)
app.use(cors())

app.use('/api/v1', routes)

app.get( "/health", async ( req, res ) => {
    return res.status(200).json({message: "Service Running"})
});

// add this handler before emitting any events
process.on('uncaughtException', function (err) {
    console.log('UNCAUGHT EXCEPTION - keeping process alive:', err); 
});
app.listen( Locals.config().port, () => {
    Logger.info(`server started at http://localhost:${ process.env.PORT }`)
});