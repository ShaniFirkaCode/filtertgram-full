import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStories, removeStory, updateStory } from '../store/story.actions'
import { StoryList } from '../cmps/story-list'
import { Suggested } from '../cmps/suggested'

export function HomeIndex() {
    const { stories } = useSelector((storeState) => storeState.storyModule)

    useEffect(() => {
        loadStories()
        console.log(stories)
    }, [])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            console.log('story with id', storyId, 'has removed')
        } catch (err) {
            console.log('cannot remove story with id', storyId, err)
        }
    }

    async function onUpdateStory(story, user) {
        try {
            const updatedStory = await updateStory(story, user)
            return updatedStory
        } catch (err) {
            console.log('cannot remove story with id', story._id, err)
        }
    }

    return (
        <section>
            <div className='home-index flex'>
                <section className='story-container'>
                    <StoryList stories={stories} onRemoveStory={onRemoveStory} onUpdateStory={onUpdateStory} />
                </section>
                <Suggested />
            </div >
        </section >
    )
}