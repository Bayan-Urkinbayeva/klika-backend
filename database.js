import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}).promise();

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
            order by ${sorted.length != 0 ? sorted : 'm.id'}
            ${limit}
    `)
    return res;
}
export function getSorted(cookies){
    let sortedList = getQuerySort(cookies)
    let result =''
    if(sortedList.length<1){
        return ''
    }
    for(let i=0; i<sortedList.length; i++){
        result+=sortedList[i]
        if (i+1 != sortedList.length){
            result += ' and '
        }
    }
    return result
}
export function getQuerySort(sort){
    let sorted = []
    if(sort.sortbyAsc == "id"){
        sorted.push(" m.id ASC")
    }
    if(sort.sortbyAsc == "singer"){
        sorted.push(" s.name ASC")
    }
    if(sort.sortbyAsc=="genre"){
        sorted.push(" g.name ASC")
    }
    if(sort.sortbyAsc=="year"){
        sorted.push(" m.year ASC")
    }
    if(sort.sortbyAsc=="music"){
        sorted.push(" m.name ASC")
    }
    if(sort.sortbyDesc == "id"){
        sorted.push(" m.id DESC")
    }
    if(sort.sortbyDesc == "singer"){
        sorted.push(" s.name DESC")
    }
    if(sort.sortbyDesc=="genre"){
        sorted.push(" g.name DESC")
    }
    if(sort.sortbyDesc=="year"){
        sorted.push(" m.year DESC")
    }
    if(sort.sortbyDesc=="music"){
        sorted.push(" m.name DESC")
    }
    return sorted;
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
