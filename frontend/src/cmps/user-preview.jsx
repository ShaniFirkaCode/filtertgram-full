import { useNavigate } from "react-router-dom"

export function UserPreview({ user }) {
    const navigate = useNavigate()
    return (
        <article className="user-preview flex row" onClick={() => navigate(`/profile/${user._id}`)}>
            <img className="mini-user-img" src={user.userImg.url} style={user.userImg.style} alt="" />
            <p>{user.username}</p>

        </article>
    )
}