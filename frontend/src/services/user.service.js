import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,

    getLoggedinUser,
    saveLocalUser,

    getUsers,
    getById,
    remove,
    update,

    getEmptyUser,
    getEmptyCred,
    getDemoUserCred
}
window.userService = userService

function getUsers(filterBy = { txt: '' }) {
    return httpService.get(`user`, filterBy)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, user }) {
    const updatedUser = await httpService.put(`user/${_id}`, { _id, user })
    if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        saveLocalUser(user)
        return user
    }
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    // saveLocalUser(user)
    return user
}

async function logout() {
    return await httpService.post('auth/logout')
}

function getEmptyUser() {
    return {
        fullname: "",
        username: "",
        password: "",
        userBio: "",
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
}

function getEmptyCred() {
    return {
        fullname: "",
        username: "",
        password: "",
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, userImg: user.userImg }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getDemoUserCred() {
    return {
        username: 'davidg',
        password: 'dvd123',
    }
}

