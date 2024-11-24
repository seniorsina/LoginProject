import express, {Request, Response}from 'express';
import debug  from "debug";
import connectDB from './db/dbConnection';
import config from "config";
import router from './Routes';
import { globalErrorHandler } from './middlewares/errorHandler';

const app = express();

const logger = debug("");
const appName = config.get<string>('app.name');
const port = config.get<number>('app.port');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api',router);
app.use(globalErrorHandler)

connectDB();


app.listen(port, ()=>{
  console.log("listen to port");
})
