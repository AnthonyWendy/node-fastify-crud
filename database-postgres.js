import { randomUUID } from "crypto"
import { sql } from "./db"

export class DatabaseMemory {
    #videos = new Map

    async create(video) {
        const videoId = randomUUID

        const { id, title, description, duration } = video

        await sql` insert into videos (id, title, description, duration)
                    values
                    (${videoId}, ${id}, ${title}, ${description}, ${duration}) `
    }

    async list(search = '') {
        let videos

        if(search){
            videos = await sql` select * from videos where title like ${'%' + search + '%'} `
        } else {
            videos = await sql` select * from videos `
        }

        sql`select * from videos`
    }

    async update(id, video) {
        const { id, title, description, duration } = video

        await sql`UPDATE videos
                    SET title = ${title},
                        description = ${description},
                        duration = ${duration},
                    WHERE id = ${id}; `

    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }

}