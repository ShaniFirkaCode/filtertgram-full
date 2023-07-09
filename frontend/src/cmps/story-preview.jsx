import { CommentAdd } from './comment-add'
import { CommentList } from './comment-list'
import { likeIcon, unlikeIcon, optionsIcon, savedIcon, sendIcon, trashIcon } from './icons'
import { LongTxt } from './long-txt'
import { userService } from '../services/user.service'
import { useState } from 'react'

export function StoryPreview({ story, onRemoveStory, onUpdateStory }) {

    const user = userService.getLoggedinUser()
    const [isLiked, setIsLiked] = useState(story.likedBy.some((u) => u._id === user._id))
    const [isExpanned, setIsExpanned] = useState(false)

    async function onToggleLike() {
        let updatedLikes
        if (isLiked) {
            updatedLikes = story.likedBy.filter(u => u._id !== user._id)
        } else {
            updatedLikes = story.likedBy.push(user)
        }
        const updatedstory = { ...story, likedBy: updatedLikes }
        console.log('updatedstory', updatedstory)

        story = onUpdateStory(updatedstory, user)
        setIsLiked(prev => !prev)
    }

    function likesPreview(likesCount) {
        if (likesCount > 1) return <section className="likes">{likesCount} likes</section>
        else if (likesCount === 1) return <section className="like">{likesCount} like</section>
        return <section className="no-likes">no likes yet</section>
    }

    function getComments(comments) {
        const commentsCount = comments.length
        let shownComments = (commentsCount >= 2) ? [comments[commentsCount - 2], comments[commentsCount - 1]] : comments
        const isMore = (comments.length > 2)
        console.log(' comments', comments)

        return (
            <section>
                <CommentList comments={shownComments} />
                {isMore && <button > view all {commentsCount} comments </button>}
            </section>)
    }

    return (
        <article className="story-preview flex column">
            <header className="story-header flex space-between">
                <div className="user-preview flex">
                    <img className="mini-user-img" src={story.by.userImg.url} style={story.by.userImg.style} alt="" />
                    <div className="story-info">
                        <h4 className="user-name">{story.by.username}</h4>
                    </div>
                </div>
                <div className={isExpanned ? 'remove-menu open' : 'remove-menu'}>
                    <a className='remove-menu-btn' onClick={() => onRemoveStory(story._id)}>{trashIcon}</a>
                </div>
                <div className='remove-btn-container flex column' >
                    <button className="icon-btn remove-btn" onClick={() => setIsExpanned(!isExpanned)}>{optionsIcon}</button>
                </div>
            </header>

            <section className='story-img-container' >
                <img className="story-img" src={story.img.url} style={story.img.style} alt="" />
            </section>

            <div className="action-btns">
                <div className="icon-btn like-btn">
                    <a onClick={onToggleLike}>{isLiked ? unlikeIcon : likeIcon}</a>
                </div>
                <button className='icon-btn'><span>{sendIcon}</span></button>
                <button className='icon-btn save'><span>{savedIcon}</span></button>
            </div>

            {likesPreview(story.likedBy.length)}

            <section className='story-title'>
                <p className="user-name">{story.by.username}</p>
                <LongTxt txt={story.txt} length={119} />
            </section>

            <section className='comments-preview'>{getComments(story.comments)}</section>

            <section><CommentAdd story={story} /></section>
        </article>
    )
}