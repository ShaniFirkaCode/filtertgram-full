import { storyService } from "../services/story.service.js";
import { store } from './store.js'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, UPDATE_STORY } from "./story.reducer.js";


// Action Creators:
export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
export function getActionAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
export function getActionUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}

export async function loadStories() {
    try {
        const stories = await storyService.query()
        console.log('Stories from DB:', stories)
        store.dispatch({
            type: SET_STORIES,
            stories
        })

    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getActionRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getActionAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story, user) {
    try {
        const savedStory = await storyService.save(story, user)
        console.log('Updated Story:', savedStory)
        store.dispatch({ type: UPDATE_STORY, story })
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}
