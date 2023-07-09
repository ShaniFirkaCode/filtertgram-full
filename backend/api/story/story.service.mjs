import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query() {
    try {
        // const criteria = {}
        const collection = await dbService.getCollection('story')
        var storyCursor = await collection.find()

        const stories = storyCursor.toArray()
        return stories
    } catch (err) {
        logger.error('cannot find stories', err)
        throw err
    }
}

async function getById(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        const story = collection.findOne({ _id: ObjectId(storyId) })
        return story
    } catch (err) {
        logger.error(`while finding story ${storyId}`, err)
        throw err
    }
}

async function remove(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.deleteOne({ _id: ObjectId(storyId) })
        return storyId
    } catch (err) {
        logger.error(`cannot remove story ${storyId}`, err)
        throw err
    }
}

async function add(story) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.insertOne(story)
        return story
    } catch (err) {
        logger.error('cannot insert story', err)
        throw err
    }
}

async function update(story) {
    try {
        const storyId = story._id
        delete story._id
        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: ObjectId(storyId) }, { $set: story })
        return story
    } catch (err) {
        logger.error(`story service: cannot update story ${story._id}`, err)
        throw err
    }
}

async function addStoryComment(storyId, comment) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: ObjectId(storyId) }, { $push: { comments: comment } })
        return comment
    } catch (err) {
        logger.error(`cannot add story comment ${storyId}`, err)
        throw err
    }
}

async function removeStoryComment(storyId, commentId) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: ObjectId(storyId) }, { $pull: { comments: { id: commentId } } })
        return commentId
    } catch (err) {
        logger.error(`cannot add story comment ${storyId}`, err)
        throw err
    }
}

export const storyService = {
    remove,
    query,
    getById,
    add,
    update,
    addStoryComment,
    removeStoryComment,
}
