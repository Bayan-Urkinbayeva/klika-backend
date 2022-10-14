import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
export const pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        }).promise();

export async function getMusics(){
    const [res] = await pool.query("SELECT * FROM music")
    return res;
}
export async function getMusic(id){
    const [res] = await pool.query(`SELECT * FROM music WHERE id= ?`, [id])
    return res;
}
export async function getGenres(){
    const [res] = await pool.query("SELECT DISTINCT `genre` FROM `music` ORDER BY `genre` ASC")
    return res;
}
export async function getSingers(){
    const [res] = await pool.query("SELECT DISTINCT `singer` FROM `music` ORDER BY `singer` ASC")
    return res;
}
export async function getYears(){
    const [res] = await pool.query("SELECT DISTINCT `year` FROM `music` ORDER BY `year` ASC")
    return res;
}
