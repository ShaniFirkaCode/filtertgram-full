export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_COMMENT = 'ADD_COMMENT'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'

const initialState = {
    stories: [],
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var stories
    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
            break
        case REMOVE_STORY:
            stories = state.stories.filter(story => story._id !== action.storyId)
            newState = { ...state, stories }
            break
        case ADD_STORY:
            newState = { ...state, stories: [action.story, ...state.stories] }
            break
        case UPDATE_STORY:
            stories = state.stories.map(s => (s._id === action.story._id) ? action.story : s)
            newState = { ...state, stories }
            break

        default:

    }
    return newState
}