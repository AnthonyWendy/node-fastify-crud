import { fastify } from "fastify";
import { DatabasePostgres } from "./database-memory.js";
const server = fastify()

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {

    const { title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const listVideos = await database.list(search)

    return listVideos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, duration, description } = request.body

    const video = await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.get('/', () => {
    return 'use fastify'
})

server.listen({
    port:3333
})