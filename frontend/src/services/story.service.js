import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const BASE_URL = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment,
    removeStoryComment,
    getEmptyStory,
    // addLike,
}
window.cs = storyService

async function query(filterBy = { by: '' }) {
    return httpService.get('story/', filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}

async function save(story, loggedinUser) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, { story, loggedinUser })
    } else {
        savedStory = await httpService.post(`story/`, { story, loggedinUser })
    }
    return savedStory
}

async function addStoryComment(storyId, txt) {
    const savedComment = await httpService.post(`story/${storyId}/comment`, { txt })
    return savedComment
}

async function removeStoryComment(storyId, commentId) {
    const savedComment = await httpService.post(`story/${storyId}/comment/${commentId}`)
    return savedComment
}

function getEmptyStory() {
    return {
        txt: '',
        img: {
            url: '',
            style: { filter: 'none' }
        },
        taggedUsers: [],
        comments: [],
        likedBy: [],
        hashtags: []
    }
}
