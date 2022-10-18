import express from "express";
import cookieParser from "cookie-parser";
import {getMusics, getFilter} from './database.js';
import cors from 'cors'
const app = express()

app.use(cors())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());

app.get("/" , async (req,res) => {
    console.log('Hello klika')
    res.send(await getMusics(req.cookies))
})

app.get("/filters", async(req,res) => {
  res.send(await getFilter())
})



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
  })

  app.listen(process.env.PORT || 8080);