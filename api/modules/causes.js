import { db } from 'db'
import { saveFile} from './util.js'

async function savePhoto(data){
    const photoName = await saveFile(data.dataURI, data.title)
    return photoName
}

export async function getCauseById(data){
    try{
        let sql = `SELECT * FROM causes WHERE id = ${data}`
        let result = await db.query(sql)
        return result
        
    }catch(err) {
		console.log('connection login error thrown', err)
		err.data = {
			code: 500,
			title: '500 Internal server error',
			detail: 'the API database is currently down'
		}
		throw err
    }

}

export async function getCauses(){
    let sql = 'SELECT * FROM causes'
    let result = await db.query(sql)
    return result
}

export async function addCause(data){
    const photo = {
        title: data.name,
        dataURI: data.photo
    }
    if(data.photo){
        data.photo = await savePhoto(photo)
    }
    let sql = `SELECT * FROM causes where title="${data.title}"`
    let result = await db.query(sql)
    console.log(result.length)
    console.log(typeof result.length)
    if (result.length!= 0){
        console.log("already exsists")
        return false
    }
    else
    {
        sql = `INSERT INTO causes ( title, description, money, photo, deadline, username, createdDate)\
        VALUES( "${data.title}", "${data.description}", "${data.money}","${data.photo}", "${data.deadline}", "${data.username}" , "${data.date}" )`
        result = await db.query(sql)
        console.log(result)
        return true
    }
   
}