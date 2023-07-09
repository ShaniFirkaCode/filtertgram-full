import React from 'react'
import { userService } from '../services/user.service'

export function UserDetails({ user }) {

    console.log('imgUrl:', user.userImg.url)

    // if (!user) return <p>Loading</p>
    return <p>Loading</p>
    return (
        // <div className="profile-container">
        <section className='user-details'>
            <section className="profile-photo">
                <img src={user.userImg.url} style={user.userImg.style} />
            </section>
            <section className="profile-info">
                <div className="profile-info-header">
                    <a>{user.username}</a>
                    {/* <div> */}
                    <button className="profile-edit-btn">Edit profile</button>
                    {/* </div> */}
                </div>
                <div className="user-info">
                    <ul className='clean-list'>
                        <li>{user.userStories.length} post</li>
                        <li>{user.followersId.length} followers</li>
                        <li>{user.followingId.length} following</li>
                    </ul>
                </div>
                <div className="user-name">{user.fullname}</div>
            </section>
        </section>
        // </div>
    )
}