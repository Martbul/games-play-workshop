const baseUrl ='http://localhost:3030/data/games'
import *as request  from "../lib/request"

export const getAll = async() =>{
    const result = await request.get(baseUrl)
    console.log(result);
    return result
}

export const getOne =  async(gameId) =>{
    const result = await request.get(`${baseUrl}/${gameId}`)
    return result
}


export const create = async (gameData) =>{
    const result = await request.post(baseUrl,gameData)
    return result
}

