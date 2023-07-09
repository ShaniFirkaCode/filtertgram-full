import { userService } from '../services/user.service.js'

export const SET_LOGGEDIN_USER = 'SET_LOGGED_IN_USER'
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser() || null,
    users: [],
}

export function userReducer(state = initialState, action) {
    var newState = state

    switch (action.type) {
        case SET_LOGGEDIN_USER:
            newState = { ...state, loggedinUser: action.user }
            break
        case UPDATE_USER:
            const users = state.users.map(u => (u._id === action.user._id) ? action.user : u)
            newState = (action.user._id === state.loggedinUser._id) ? { ...state, users, loggedinUser: action.user } : { ...state, users }
            break
        case REMOVE_USER:
            newState = { ...state, users: state.users.filter(user => user._id !== action.userId) }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case ADD_USER:
            newState = { ...state, users: [...state.users, action.user] }
            break
        default:
    }
    return newState

}
