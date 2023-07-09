export function CommentPreview({ comment }) {

    return (
        <article>
            <p><span id="user-name-id" className="user-name">{comment.by.username}</span><span>{comment.txt}</span></p>
            <p>{comment.createdAt}</p>
        </article>
    )
}