import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        return await collection.deleteOne({ _id: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        // peek only updatable properties
        // const saltRounds = 10
        // const hash = await bcrypt.hash(user.password, saltRounds)
        const userToSave = {
            fullname: user.fullname,
            fullname: user.fullname,
            username: user.username,
            userBio: user.userBio,
            userImg: user.userImg,
            followingId: user.followingId,
            followersId: user.followersId,
            savedStories: user.savedStories,
            taggedStories: user.taggedStories,
            userStories: user.userStories
        }

        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: ObjectId(user._id) }, { $set: userToSave })
        return userToSave
    } catch (err) {
        logger.error(`user service: cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            fullname: user.fullname,
            username: user.username,
            password: user.password,
            userBio: '',
            userImg: {
                url: 'https://res.cloudinary.com/duxmabf4n/image/upload/v1686594941/p5igjah3vvmmfpdhs2e5.jpg',
                style: { filter: 'none' }
            },
            followingId: [],
            followersId: [],
            savedStories: [],
            taggedStories: [],
            userStories: []
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    return criteria
}




