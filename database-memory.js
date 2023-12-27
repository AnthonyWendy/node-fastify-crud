import { randomUUID } from "crypto"

export class DatabasePostgres {
    #videos = new Map

    create(video) {
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data
            }
        })
        .filter(video => {
            if(search) {
                console.log('dentro da database', search)
                return video.title.includes(search)
            } else {

            }

            return true
        })
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }

}