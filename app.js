import express from "express";

import { getMusic, getMusics, getGenres, getSingers, getYears, pool } from './database.js';
import cors from 'cors'
const app = express()

app.use(cors())
const resPerPage = 5;
app.get("/" , async (req,res) => {
  try{
    const musics = await getMusics()
    const numberOfRes = musics.length;
    const numberOfPages = Math.ceil(numberOfRes/resPerPage)
    let page = req.query.page ? Number(req.query.page) : 1  ;
    if(page > numberOfPages){
      res.redirect("/?page="+encodeURIComponent(numberOfPages));
    }
    else if(page <1 ){
      res.redirect("/?page="+encodeURIComponent("1"))
    }
    const startingLimit =  (page-1)*resPerPage

    pool.query(`SELECT * FROM music LIMIT ${startingLimit},${resPerPage}`,(err, result) => {
      if(err) throw err;
      let iterator = (page-2)<1 ? 1 : page -2;
      let endingLink = (iterator + 3) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
      if(endingLink < (page + 2)){
          iterator -= (page + 2) - numberOfPages;
      }
      res.send(result, page,iterator,endingLink,numberOfPages)
    } );
    res.send(musics)
  }catch(err){
    console.log("error")
  }
})


app.get("/musics/:id" , async (req,res) => {
    const id = req.params.id
    const music = await getMusic(id)
    res.send(music)
})

app.get("/genres", async(req,res) => {
  const genres = await getGenres()
  res.send(genres)
})

app.get("/singers", async(req,res) => {
  const singers = await getSingers()
  res.send(singers)
})

app.get("/years", async(req,res) => {
  const years = await getYears()
  res.send(years)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
  })
  
  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })