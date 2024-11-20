import express, {Request, Response}from 'express';
import debug  from 'debug';
import mongoose from 'mongoose';
import config from 'config'

const app = express();

const logger = debug("");
const appName = config.get<string>('app.name');
const port = config.get<number>('app.port');

console.log(`Running ${appName} on port ${port}`);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/',(req: Request,res:Response)=>{
  console.log
});

app.listen(port, ()=>{
  console.log("listen to port");
})
