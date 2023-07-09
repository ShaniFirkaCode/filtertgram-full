import { StoryPreview } from "./story-preview";

export function StoryList({ stories, onRemoveStory, onUpdateStory }) {

    return (
        <div>
            <ul className="story-list clean-list">
                {stories.map(story =>
                    <li className="story-preview column" key={story._id}>
                        <StoryPreview story={story} onRemoveStory={onRemoveStory} onUpdateStory={onUpdateStory} />
                    </li>
                )}

            </ul>
        </div >
    )
}