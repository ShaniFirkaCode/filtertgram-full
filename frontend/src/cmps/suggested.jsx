import { userService } from "../services/user.service";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import { loadUsers } from '../store/user.actions'
import { getRandomIntInclusive, utilService } from '../services/util.service'

export function Suggested() {
    const user = userService.getLoggedinUser()
    // const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const users = useSelector(storeState => storeState.userModule.users)
    // const user = userService.getLoggedinUser();

    // console.log('users from suggested', users[0])

    useEffect(() => {
        loadUsers()
    }, [])

    const suggestedUsers = users.map(user => user).filter((u) => u._id !== user._id)
    const randomSuggestedUser = utilService.getRandomIntInclusive(0, suggestedUsers.length - 1)

    return (
        <div className="suggestions">
            <div className="suggestion-header">
                <div className="suggestion-header-info">
                    <NavLink to={`/profile/${user._id}`}><img src={user.userImg?.url} style={user.userImg?.style} /></NavLink>
                    <div className="suggestion-user-name">
                        <NavLink to={`/profile/${user._id}`}>{user?.username}</NavLink>
                        <span>{user?.fullname}</span>
                        {/* <NavLink className="navbar-item-profile" to={`/profile/${user._id}`}><img src={user.userImg.url} style={user.userImg.style} />Profile</NavLink> */}
                    </div>
                </div>
            </div>
            <div className="suggested-options">
                <span>Suggested for you</span>
                <a>See all</a>
            </div>
            <div className="suggestion-header">
                <div className="suggestion-header-info">
                    <span><img src={suggestedUsers[randomSuggestedUser]?.userImg.url} style={user.userImg?.style} /></span>
                    <div className="suggestion-user-name">
                        <span className="suggestion">{suggestedUsers[randomSuggestedUser]?.fullname} </span>
                        <span>{suggestedUsers[randomSuggestedUser]?.username}</span>
                    </div>
                </div>
            </div>
            {/* <div className="suggestion-header">
                <div className="suggestion-header-info">
                    <span><img src={suggestedUsers[2]?.userImg.url} style={user.userImg?.style} /></span>
                    <div className="suggestion-user-name">
                        <span className="suggestion">{suggestedUsers[2]?.fullname} </span>
                        <span>{suggestedUsers[2]?.username}</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}