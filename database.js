import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}).promise();

const columns = {id: 'm.id', name: 'm.name', year: 'm.year', singer: 's.name', genre: 'g.name'}
const orders = {asc: ' asc', desc: ' desc'}

export async function getMusics(cookies){
    const filter= getFilters(cookies)
    const limit = getPage(cookies)
    const sorted = getSorted(cookies)
    const [res] = await pool.query(`
        SELECT m.id, m.name, m.year, g.name as genre, s.name as singer 
            FROM music as m 
            INNER JOIN genres as g on m.genre_id = g.id 
            INNER JOIN singers as s on m.singer_id=s.id 
            ${filter} 
            order by ${sorted}
            ${limit}
    `)
    return res;
}

export function getSorted(sort){
    let column = columns[sort.column] || ' m.id'
    let order = orders[sort.order] || ' asc'

    return column + order;
}

export function getFilters(cookies){
    let filterList = getQueryFilter(cookies)
    let result = 'where'
    if (filterList.length < 1)
        return ''

    for (let i = 0; i < filterList.length; i++) {
        result += filterList[i]
        if (i+1 !== filterList.length)
            result += ' and '
    }
    return result
}

export function getQueryFilter(filters){
    let filter = []
    if (filters.singer)
        filter.push(` s.id=${filters.singer}`)
    if (filters.genre)
        filter.push(` g.id=${filters.genre}` )
    if (filters.year)
        filter.push(` m.year=${filters.year}`)
    return filter
}

export function getPage(filters){
    let page = filters.page
    let size = filters.size

    if (!page) page = 1
    if (!size) size = 5

    let begin = ((page-1)*size)

    return `limit ${begin}, ${size}`
}

function toFlat(arr){
    return arr.map(x => (
        Object.values(x)
    )).flat()

}
export async function getFilter(){
    const [singer] = await pool.query("SELECT DISTINCT * FROM `singers` ORDER BY name ASC")
    const [genres] = await pool.query("SELECT DISTINCT * FROM `genres` ORDER BY name ASC")
    let [year] = await pool.query("SELECT DISTINCT year FROM `music` ORDER BY year")
    year = toFlat(year)
    return {singer: singer, genres: genres, year: year}
}
